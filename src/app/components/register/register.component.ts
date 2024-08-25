import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCardActions, MatCardModule} from "@angular/material/card";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatAccordion, MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from "@angular/material/expansion";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {SpinnerService} from "../../services/spinner.service";
import {lastValueFrom} from "rxjs";
import {AuthenticationResponse} from "../../dto/response/sign-in-response.dto";
import {CulturesService} from "../../services/cultures.service";
import {CultureResponseDto} from "../../dto/response/culture-response.dto";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";

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
    MatExpansionModule,
    MatSelect,
    MatOption,
    NgForOf
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

  cultures: CultureResponseDto[] = []

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private spinnerService: SpinnerService,
              private readonly _cultureService: CulturesService,
              private router: Router) {

  }

  ngOnInit(): void {
    this._cultureService.getAllCultures().subscribe(
      (cultures) => {
        this.cultures = cultures;
      }
    );

  }

  async onSubmit() {
    if (this.registerForm.valid) {
      debugger;
      this.spinnerService.show()
      const formValues = this.registerForm.value;

      const registerData = {
        formFields: Object.keys(formValues).map(key => ({
          id: key,
          value: formValues[key]
        }))
      };

      const signUpResponse = await lastValueFrom(this.authService.register(registerData))

      if (signUpResponse.status === 'OK') {
        this.spinnerService.hide()

        this.navigateToHome()
      }

      this.spinnerService.hide()
    }
  }

  navigateToHome() {
    debugger;
    this.router.navigate(['/home'])
  }

}
