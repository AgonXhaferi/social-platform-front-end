import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserDto} from "../dto/user.dto";
import {catchError, concatMap, forkJoin, from, of, zip} from "rxjs";
import {UserService} from "../../services/user.service";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import Session from "supertokens-web-js/recipe/session";
import {FollowUserDto} from "../dto/follow-user.dto";
import {NgIf} from "@angular/common";
import {SpinnerService} from "../../services/spinner.service";
import {ChatService} from "../../services/chat.service";
import {UserChatDto} from "../dto/users-chat.dto";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  cultureUsersId: string | null = ""
  cultureUser?: UserDto

  userId: string = ""
  areFollowers: boolean = false

  constructor(private _activeRoute: ActivatedRoute,
              private _userService: UserService,
              private _chatService: ChatService,
              private _spinnerService: SpinnerService,
              private _router: Router) {
  }

  ngOnInit(): void {

    this._spinnerService.show()

    zip([
      this._activeRoute.paramMap,
      Session.getUserId()
    ])
      .pipe(
        concatMap(([paramMap, userId]) => {
          this.cultureUsersId = paramMap.get('userId')
          this.userId = userId

          if (this.cultureUsersId) {
            return zip([
              this._userService.findUserById(this.cultureUsersId),
              this._userService.areUserFollowers({
                followerId: this.cultureUsersId,
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
            alert(`User with ID: ${this.cultureUsersId} does not exist.`)
          }
        }
      )

  }

  followUser() {
    this._spinnerService.show()

    from(Session.getUserId())
      .pipe(
        concatMap(userId => {
          if (this.cultureUsersId) {
            const followUserDto: FollowUserDto = {
              followerId: this.cultureUsersId,
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
    if (this.cultureUsersId)
      this._chatService.doesChatExist({
        userOneId: this.cultureUsersId,
        userTwoId: this.userId
      }).pipe(
        concatMap(doesChatExistValue => {
          return from(this._router.navigate([`/chat`, doesChatExistValue.id]))
        }),
        catchError(err => {
          debugger;
          return this._chatService.createChat(<UserChatDto>{
            userOneId: this.cultureUsersId,
            userTwoId: this.userId
          })
        })
      ).subscribe(responseId => {
        if (typeof responseId === "string") {
          this._router.navigate([`/chat`, responseId])
            .then()
        }
      })
  }
}
