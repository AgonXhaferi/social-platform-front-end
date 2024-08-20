import {Component, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  Observable,
  of,
  Subject,
  switchMap
} from "rxjs";
import {CulturesService} from "../../services/cultures.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {SpinnerService} from "../../services/spinner.service";
import {CultureEventResponseDto} from "../../dto/response/culture-event-response.dto";
import {CreateEventDialogComponent} from "../create-event-dialog/create-event-dialog.component";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-culture-events',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButton,
    MatInput,
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './culture-events.component.html',
  styleUrl: './culture-events.component.css'
})
export class CultureEventsComponent implements OnInit {
  cultureName: string | null | undefined

  private searchTerms = new Subject<string>();

  protected $cultureEvents: Observable<CultureEventResponseDto[]> = of([]);
  protected $filteredEvents: Observable<CultureEventResponseDto[]> = of([]);

  protected selectedEvent: CultureEventResponseDto | undefined;

  constructor(
    private readonly _culturesService: CulturesService,
    private readonly _dialog: MatDialog,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _spinnerService: SpinnerService,
    private readonly domSanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this._spinnerService.show()

    this.setCultureName()
      .then(() =>
        this.loadEvents()
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

  loadEvents() {
    this.$cultureEvents = this._culturesService.getLatestEvents({
        numberOfEvents: 10,
        cultureName: this.cultureName!
      }
    )
  }

  setupSearch() {
    debugger;
    this.$filteredEvents = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
          return term
            ? this._culturesService.findEventByTitle(term, this.cultureName!).pipe(
              catchError(err => this.$cultureEvents)
            )
            : this.$cultureEvents
        }
      ),
      catchError(error => {
        console.error(`Error in component: ${error}`);
        return of<CultureEventResponseDto[]>([]);
      })
    );
  }

  openCreateEventDialog() {
    const dialogRef = this._dialog.open(CreateEventDialogComponent, {
      width: '400px',
      data: {
        culture: this.cultureName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'created') {
        this.loadEvents(); // Reload the articles after creating a new one
      }
    });
  }

  selectEvent(article: CultureEventResponseDto) {
    this.selectedEvent = article
  }

  search(term: string) {
    this.searchTerms.next(term)
  }

  getGoogleMapsUrl(lat: number | undefined, lng: number | undefined): SafeResourceUrl {
    if (!lat || !lng) {
      throw new Error('Latitude and Longitude invalid.')
    }
    const url = `https://maps.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url)
  }
}
