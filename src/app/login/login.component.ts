import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {of} from "rxjs";
import Session from "supertokens-web-js/recipe/session";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";
import {SpinnerService} from "../services/spinner.service";

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
    this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/welcome'])
            .then()
        }
      })
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.spinnerService.show()

      const formValues = this.signInForm.value;

      const signInData = {
        formFields: Object.keys(formValues).map(key => ({
          id: key,
          value: formValues[key]
        }))
      };

      this.authService.signIn(signInData)
        .pipe()
        .subscribe(async data => {
          if (data.status !== 'OK') {
            alert(`Username or password incorrect, ${data.status}`)

            this.signInForm.reset()
            this.spinnerService.hide()

            return;
          }

          this.navigateToWelcome()
        })
    }
  }

  navigateToWelcome() {
    this.router.navigate(['/welcome'])
      .then(
        () => {
          this.authService.isAuthenticatedSubject.next(true)
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
