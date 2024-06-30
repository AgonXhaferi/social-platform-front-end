import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {UserDto} from "../dto/user.dto";
import {concatMap, forkJoin, from, zip} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";
import {MatButton} from "@angular/material/button";
import {CulturesService} from "../../services/cultures.service";
import Session from "supertokens-web-js/recipe/session";
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-culture-users',
  standalone: true,
  imports: [MatTableModule, AsyncPipe, NgIf, MatButton],
  templateUrl: './culture-users.component.html',
  styleUrl: './culture-users.component.css'
})
export class CultureUsersComponent implements OnInit {
  culture: string = ""
  users: UserDto[] = []
  displayedColumns: string[] = ['name', 'lastname', 'username', 'email', 'country', 'postalCode', 'street', 'age', 'view'];
  isCultureSubscribedByUser: boolean = false

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private cultureService: CulturesService,
              private spinnerService: SpinnerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.spinnerService.show()

    zip([this.route.paramMap, from(Session.getUserId())])
      .pipe(
        concatMap(([params, userId]) => {
          debugger;
          this.culture = params.get('cultureName')!;

          if (!this.culture) {
            alert('Culture path variable incorrect');
            throw new Error('Culture path variable incorrect');
          }

          return zip([
            this.userService.findUsersByPrimaryCultureId(this.culture),
            this.cultureService.findIsUserSubscribedToCulture({
              userId,
              cultureId: this.culture
            })
          ])
        })
      ).subscribe(([usersOfPrimaryCulture, isUserSubscribed]) => {
      this.users = usersOfPrimaryCulture;
      this.isCultureSubscribedByUser = isUserSubscribed

      this.spinnerService.hide()
    })
  }

  onRowClicked(row: UserDto): void {
    this.spinnerService.show()

    const link = ['/users', row.id];

    this.router.navigate(link).then(
      () => this.spinnerService.hide()
    )
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
      ).subscribe(data => {
      debugger;
      this.isCultureSubscribedByUser = true
      console.log(data)
    })
  }

  viewUserProfile(id: string) {
  }
}
