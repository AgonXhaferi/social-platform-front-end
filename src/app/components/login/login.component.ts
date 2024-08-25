import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";
import {SpinnerService} from "../../services/spinner.service";
import {AuthService} from "../../services/auth.service";
import {concatMap, lastValueFrom, of} from "rxjs";
import Session from "supertokens-web-js/recipe/session";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private spinnerService: SpinnerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().then(
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/welcome'])
            .then()
        }
      }
    )
  }

  async onSubmit() {
    if (this.signInForm.valid) {
      this.spinnerService.show()

      const formValues = this.signInForm.value;

      const signInData = {
        formFields: Object.keys(formValues).map(key => ({
          id: key,
          value: formValues[key]
        }))
      };

      const signInResponse = await lastValueFrom(this.authService.signIn(signInData))

      if (signInResponse.status !== 'OK') {
        alert(`Username or password incorrect, ${signInResponse.status}`)

        this.signInForm.reset()
        this.spinnerService.hide()

        return;
      }

      this.navigateToHome()
    }
  }

  navigateToHome() {
    this.router.navigate(['/home'])
      .then(
        () => {
          this.spinnerService.hide()
        }
      )
  }

  navigateToRegister() {
    this.router.navigate(['/register'])
      .then(() =>
        this.spinnerService.hide()
      );
  }
}
