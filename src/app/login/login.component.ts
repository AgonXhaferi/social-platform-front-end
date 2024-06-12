import {Component} from "@angular/core";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {

  }

  onSubmit() {
    if (this.signInForm.valid) {
      const formValues = this.signInForm.value;

      const signInData = {
        formFields: Object.keys(formValues).map(key => ({
          id: key,
          value: formValues[key]
        }))
      };

      this.authService.signIn(signInData)
        .subscribe(data => {
          debugger;
          console.log(data)
        })
    }
  }
}
