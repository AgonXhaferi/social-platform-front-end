import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {MatCardActions, MatCardModule} from "@angular/material/card";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatAccordion, MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from "@angular/material/expansion";
import {Router} from "@angular/router";
import {SpinnerService} from "../services/spinner.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatLabel,
    MatFormFieldModule,
    MatCardActions,
    MatInputModule,
    MatButtonModule,
    MatAccordion,
    MatExpansionModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({
    culture: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(0)]],
    userName: ['', Validators.required],
    street: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    lastName: ['', Validators.required],
    name: ['', Validators.required],
    country: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private spinnerService: SpinnerService,
              private router: Router) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;

      const registerData = {
        formFields: Object.keys(formValues).map(key => ({
          id: key,
          value: formValues[key]
        }))
      };

      this.authService.register(registerData)
        .subscribe(data => {
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

}
