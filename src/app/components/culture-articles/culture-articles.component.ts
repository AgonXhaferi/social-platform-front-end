import {Component, OnInit} from '@angular/core';
import {CultureArticleResponseDto} from "../../dto/response/culture-article-response.dto";
import {MatDialog} from "@angular/material/dialog";
import {CulturesService} from "../../services/cultures.service";
import {ActivatedRoute} from "@angular/router";
import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged, firstValueFrom, from,
  lastValueFrom, mergeMap,
  Observable,
  of,
  Subject,
  switchMap
} from "rxjs";
import {CreateArticleDialogComponent} from "../create-article-dialog/create-article-dialog.component";
import {MatListModule} from "@angular/material/list";
import {AsyncPipe, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {MatLineModule} from "@angular/material/core";
import {MatButton} from "@angular/material/button";
import {WelcomeComponent} from "../welcome/welcome.component";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-culture-articles',
  standalone: true,
  imports: [
    MatListModule,
    MatInputModule,
    MatLineModule,
    NgForOf,
    SlicePipe,
    MatButton,
    WelcomeComponent,
    NgIf,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './culture-articles.component.html',
  styleUrl: './culture-articles.component.css'
})
export class CultureArticlesComponent implements OnInit {
  cultureName: string | null | undefined

  private searchTerms = new Subject<string>();

  protected $cultureArticles: Observable<CultureArticleResponseDto[]> = of([]);
  protected $filteredArticles: Observable<CultureArticleResponseDto[]> = of([]);

  protected selectedArticle: CultureArticleResponseDto | undefined;

  constructor(
    private readonly _culturesService: CulturesService,
    private readonly _dialog: MatDialog,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _spinnerService: SpinnerService
  ) {
  }

  ngOnInit(): void {
    this._spinnerService.show()

    this.setCultureName()
      .then(() =>
        this.loadArticles()
      )
      .then(() => {
        this.setupSearch()
      })
      .then(() => this._spinnerService.hide())

  }

  private async setCultureName(): Promise<void> {
    this.cultureName = await firstValueFrom(this._activatedRoute.paramMap
      .pipe(
        concatMap(params => {
          const cultureName = params.get('cultureName');
          if (!cultureName) {
            alert('culture name param not found!')
            throw new Error('culture name param not found!')
          }
          return of(cultureName)
        })
      ))
  }

  loadArticles() {
    this.$cultureArticles = this._culturesService.getLatestArticles({
        numberOfArticles: 10,
        cultureName: this.cultureName!
      }
    )
  }

  setupSearch() {
    debugger;
    this.$filteredArticles = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
          return term
            ? this._culturesService.findArticleByTitle(term, this.cultureName!).pipe(
              catchError(err => this.$cultureArticles)
            )
            : this.$cultureArticles
        }
      ),
      catchError(error => {
        console.error(`Error in component: ${error}`);
        return of<CultureArticleResponseDto[]>([]);
      })
    );
  }

  openCreateArticleDialog() {
    const dialogRef = this._dialog.open(CreateArticleDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'created') {
        this.loadArticles(); // Reload the articles after creating a new one
      }
    });
  }

  selectArticle(article: CultureArticleResponseDto) {
    this.selectedArticle = article
  }

  search(term: string) {
    debugger;
    this.searchTerms.next(term)
  }


}
