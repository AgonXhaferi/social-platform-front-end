import {Component, OnInit} from '@angular/core';
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {AuthService} from "../../services/auth.service";
import {SpinnerService} from "../../services/spinner.service";
import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import {UserService} from "../../services/user.service";
import {UserResponseDto} from "../../dto/response/user-response.dto";
import {concatMap, from, of} from "rxjs";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    MatButton
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: UserResponseDto | undefined

  constructor(private readonly _authService: AuthService,
              private readonly _spinnerService: SpinnerService,
              private readonly _userService: UserService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this._spinnerService.show()
    from(Session.getUserId())
      .pipe(
        concatMap((userId) => {
          return this._userService.findUserById(userId)
        }),
      ).subscribe(
      userResponseDto => {
        this.user = userResponseDto
        this._spinnerService.hide()
      }
    )
  }


  async signOut() {
    this._spinnerService.show()

    await this._authService.signOut()

    debugger;
    const sessionExist = await Session.doesSessionExist()

    console.log(sessionExist)

    this.router.navigate(['/home'])
      .then(
        () => this._spinnerService.hide()
      )
  }
}
