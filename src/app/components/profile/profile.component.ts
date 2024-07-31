import {Component, OnInit} from '@angular/core';
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {AuthService} from "../../services/auth.service";
import {SpinnerService} from "../../services/spinner.service";
import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  //TODO: Add logic here regarding the current user data/ password change etc. etc..
  userId: string | undefined

  constructor(private authService: AuthService,
              private spinnerService: SpinnerService) {
  }

  async ngOnInit(): Promise<void> {
    this.userId = await Session.getUserId()
  }


  async signOut() {
    this.spinnerService.show()

    await this.authService.signOut()

    this.spinnerService.hide()
  }
}
