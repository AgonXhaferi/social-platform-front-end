import { Component } from '@angular/core';
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {AuthService} from "../../services/auth.service";
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private authService: AuthService,
              private spinnerService: SpinnerService) {
  }

  async signOut(){
    this.spinnerService.show()

    await this.authService.signOut()

    this.spinnerService.hide()
  }
}
