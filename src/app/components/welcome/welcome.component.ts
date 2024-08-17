import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  constructor(private _router: Router) {
  }

  redirectToCultures() {
    return this._router.navigate(['/cultures']);
  }
}
