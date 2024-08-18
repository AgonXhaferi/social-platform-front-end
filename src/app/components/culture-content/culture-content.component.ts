import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {UserDto} from "../../dto/user.dto";
import {concatMap, forkJoin, from, zip} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";
import {MatButton} from "@angular/material/button";
import {CulturesService} from "../../services/cultures.service";
import Session from "supertokens-web-js/recipe/session";
import {SpinnerService} from "../../services/spinner.service";
import {MatTab} from "@angular/material/tabs";

@Component({
  selector: 'app-culture-content',
  standalone: true,
  imports: [MatTableModule, AsyncPipe, NgIf, MatButton, MatTab, NgForOf],
  templateUrl: './culture-content.component.html',
  styleUrl: './culture-content.component.css'
})
export class CultureContentComponent implements OnInit {
  culture: string = ""
  isCultureSubscribedByUser: boolean = false
  topArticles: any;
  topEvents: any;

  constructor(private route: ActivatedRoute,
              private cultureService: CulturesService,
              private spinnerService: SpinnerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.spinnerService.show()

    zip([this.route.paramMap, from(Session.getUserId())])
      .pipe(
        concatMap(([params, userId]) => {
          this.culture = params.get('cultureName')!;

          if (!this.culture) {
            alert('Culture path variable incorrect');
            throw new Error('Culture path variable incorrect');
          }

          return this.cultureService.findIsUserSubscribedToCulture({
            userId,
            cultureId: this.culture
          })
        })
      ).subscribe(
      (
        isUserSubscribed
      ) => {
        this.isCultureSubscribedByUser = isUserSubscribed

        this.spinnerService.hide()
      })
  }


  async subscribe() {
    from(Session.getUserId())
      .pipe(
        concatMap(userId => {
          return this.cultureService.subscribeToCulture({
            userId,
            cultureId: this.culture
          })
        })
      ).subscribe(() => {
      this.isCultureSubscribedByUser = true
    })
  }

  navigateToUsers() {
    const link = ['cultures/users-culture', this.culture];
    this.router.navigate(link).then();
  }

  navigateToArticle(id: string) {

  }

  navigateToAllArticles() {
    const link = ['cultures/culture-articles', this.culture];
    this.router.navigate(link).then();
  }

  navigateToEvent(id: string) {

  }

  navigateToAllEvents() {
    const link = ['cultures/culture-events', this.culture];
    this.router.navigate(link).then();
  }
}
