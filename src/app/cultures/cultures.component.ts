import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, Observable, of, Subject, Subscription, switchMap} from "rxjs";
import {CultureDto} from "../dto/culture.dto";
import {CulturesService} from "../services/cultures.service";
import {Router} from "@angular/router";
import {AsyncPipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-cultures',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf
  ],
  templateUrl: './cultures.component.html',
  styleUrl: './cultures.component.css'
})
export class CulturesComponent implements OnInit, OnDestroy {
  cultures$: Observable<CultureDto[]> = of([]);
  private searchTerms = new Subject<string>();

  constructor(
    private culturesService: CulturesService,
    private router: Router
  ) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.cultures$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        term
          ? this.culturesService.findCultureById(term).pipe(
            catchError(error => {
              console.error(`Error in component: ${JSON.stringify(error)}`);
              return of<CultureDto[]>([]);
            })
          )
          : of<CultureDto[]>([])
      ),
      catchError(error => {
        debugger;
        console.error(`Error in component: ${error}`);
        return of<CultureDto[]>([]);
      })
    );
  }

  gotoDetail(culture: CultureDto): void {
    const link = ['/users', culture];
    this.router.navigate(link);
  }

  ngOnDestroy(): void {
  }
}
