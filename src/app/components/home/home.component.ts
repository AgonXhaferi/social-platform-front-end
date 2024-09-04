import {Component} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {AuthService} from "../../services/auth.service";
import {SpinnerService} from "../../services/spinner.service";
import {NgIf} from "@angular/common";
import {WelcomeComponent} from "../welcome/welcome.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    NgIf,
    WelcomeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isUserLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private router: Router) {
    this.spinnerService.show()

    debugger;
    this.authService.isAuthenticated()
      .then(isUserLoggedIn => {
        debugger;
        this.isUserLoggedIn = isUserLoggedIn;
        this.spinnerService.hide()
      })
      .catch(() => {
        return this.authService.attemptRefresh()
      })
      .then((refreshSuccessful) => {
        this.spinnerService.hide()

        if (typeof refreshSuccessful === 'boolean') {
          if (!refreshSuccessful) {
            this.router.navigate(['/login'])
          }
        }
      })
  }
}
