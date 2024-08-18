import {Component, OnInit} from '@angular/core';
import {CultureArticleResponseDto} from "../../dto/response/culture-article-response.dto";
import {MatDialog} from "@angular/material/dialog";
import {CulturesService} from "../../services/cultures.service";
import {ActivatedRoute} from "@angular/router";
import {concatMap} from "rxjs";
import {CreateArticleDialogComponent} from "../create-article-dialog/create-article-dialog.component";
import {MatList, MatListItem, MatListModule} from "@angular/material/list";
import {NgForOf, SlicePipe} from "@angular/common";
import {MatLine, MatLineModule} from "@angular/material/core";
import {MatButton} from "@angular/material/button";
import {WelcomeComponent} from "../welcome/welcome.component";

@Component({
  selector: 'app-culture-articles',
  standalone: true,
  imports: [
    MatListModule,
    MatLineModule,
    NgForOf,
    SlicePipe,
    MatButton,
    WelcomeComponent
  ],
  templateUrl: './culture-articles.component.html',
  styleUrl: './culture-articles.component.css'
})
export class CultureArticlesComponent implements OnInit {
  cultureName: string | undefined
  articles: CultureArticleResponseDto[] = [];

  constructor(
    private readonly _culturesService: CulturesService,
    private readonly _dialog: MatDialog,
    private readonly _activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    return this._activatedRoute.paramMap
      .pipe(
        concatMap(params => {
          const cultureNameExists = params.get('cultureName')
          if (!cultureNameExists) {
            throw new Error('Param cultureName not found!')
          }
          this.cultureName = cultureNameExists

          return this._culturesService.getLatestArticles({
            numberOfArticles: 10,
            cultureName: this.cultureName
          })
        })
      )
      .subscribe((data) => {
        this.articles = data;
        console.log(this.articles)
        debugger;
      });
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

  viewArticle(article: CultureArticleResponseDto) {
    // Logic to navigate to a detailed view of the article
  }
}
