import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserDto} from "../dto/user.dto";
import {concatMap, of} from "rxjs";
import {UserService} from "../../services/user.service";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  userId?: string | null
  user?: UserDto

  constructor(private _activeRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this._activeRoute.paramMap
      .pipe(
        concatMap(paramMap => {
          this.userId = paramMap.get('userId')

          if (this.userId)
            return this.userService.findUserById(this.userId)

          return of(undefined)
        })
      )
      .subscribe(user => {
          debugger;
          if (user) {
            this.user = user
          } else {
            alert(`User with ID: ${this.userId} does not exist.`)
          }
        }
      )
  }

  followUser() {

  }

  chatWithUser() {

  }
}
