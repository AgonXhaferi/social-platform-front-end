import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, Observable, of, Subject, Subscription, switchMap} from "rxjs";
import {CultureDto} from "../../dto/culture.dto";
import {Router} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatLine} from "@angular/material/core";
import {CulturesService} from "../../services/cultures.service";
import {MatIconButton} from "@angular/material/button";

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
    MatLine,
    NgIf,
    MatIconButton
  ],
  templateUrl: './cultures.component.html',
  styleUrl: './cultures.component.css'
})
export class CulturesComponent implements OnInit {
  filteredCultures$: Observable<CultureDto[]> = of([]);
  private searchTerms = new Subject<string>();

  constructor(
    private culturesService: CulturesService,
    private router: Router
  ) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  onFocus(): void {
    this.searchTerms.next('');
  }

  clearSearch(input: HTMLInputElement): void {
    input.value = '';
    this.search('');
  }


  ngOnInit(): void {
    this.filteredCultures$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        term.trim()
          ? this.culturesService.findCultureById(term).pipe(
            catchError(error => {
              console.error(`Error searching cultures: ${JSON.stringify(error)}`);
              return of<CultureDto[]>([]);
            })
          )
          : this.culturesService.getAllCultures()
            .pipe(
              catchError(error => {
                console.error(`Error fetching all cultures: ${JSON.stringify(error)}`);
                return of<CultureDto[]>([]);
              })
            )
      )
    );
  }

  gotoDetail(culture: CultureDto): void {
    const link = ['/cultures', culture.name];
    this.router.navigate(link).then();
  }
}
