import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserDto} from "../dto/user.dto";
import {concatMap, forkJoin, from, zip} from "rxjs";
import {UserService} from "../../services/user.service";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import Session from "supertokens-web-js/recipe/session";
import {FollowUserDto} from "../dto/follow-user.dto";
import {NgIf} from "@angular/common";
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  cultureUserId?: string | null
  cultureUser?: UserDto
  areFollowers: boolean = false

  constructor(private _activeRoute: ActivatedRoute,
              private _userService: UserService,
              private _spinnerService: SpinnerService) {
  }

  ngOnInit(): void {

    this._spinnerService.show()

    zip([
      this._activeRoute.paramMap,
      Session.getUserId()
    ])
      .pipe(
        concatMap(([paramMap, userId]) => {
          this.cultureUserId = paramMap.get('userId')

          if (this.cultureUserId) {
            return zip([
              this._userService.findUserById(this.cultureUserId),
              this._userService.areUserFollowers({
                followerId: this.cultureUserId,
                followeeId: userId
              })
            ])
          } else {
            throw new Error('UserId could not be extracted from paramMap')
          }
        })
      )
      .subscribe(([user, areFollowers]) => {
          if (user) {
            this.cultureUser = user
            this.areFollowers = areFollowers

            this._spinnerService.hide()
          } else {
            alert(`User with ID: ${this.cultureUserId} does not exist.`)
          }
        }
      )

  }

  followUser() {
    this._spinnerService.show()

    from(Session.getUserId())
      .pipe(
        concatMap(userId => {
          if (this.cultureUserId) {
            const followUserDto: FollowUserDto = {
              followerId: this.cultureUserId,
              followeeId: userId
            }

            return this._userService.followUser(followUserDto)
          }
          throw new Error('UserId not found.')
        })
      )
      .subscribe(responseId => {
          this.areFollowers = true

          this._spinnerService.hide()
        }
      )
  }

  chatWithUser() {

  }
}
