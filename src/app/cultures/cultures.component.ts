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
  searchTerm: string = '';

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
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // ignore if next search term is same as previous
      switchMap(term =>
        term
          ? this.culturesService.findCultureById(term) // return the http search observable
          : of<CultureDto[]>([]) // or the observable of empty heroes if no search term
      ),
      catchError(error => {
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
