import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, Observable, of, Subject, Subscription, switchMap} from "rxjs";
import {CultureDto} from "../dto/culture.dto";
import {CulturesService} from "../services/cultures.service";
import {Router} from "@angular/router";
import {AsyncPipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatLine} from "@angular/material/core";

@Component({
  selector: 'app-cultures',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatInput,
    MatLine
  ],
  templateUrl: './cultures.component.html',
  styleUrl: './cultures.component.css'
})
export class CulturesComponent implements OnInit {
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
        console.error(`Error in component: ${error}`);
        return of<CultureDto[]>([]);
      })
    );
  }

  gotoDetail(culture: CultureDto): void {
    const link = ['/cultures', culture.name];
    this.router.navigate(link);
  }
}
