import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import SuperTokens from "supertokens-web-js";
import {SuperTokensConfig} from "../config";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SpinnerService} from "./services/spinner.service";
import {AsyncPipe, NgIf} from "@angular/common";

SuperTokens.init(SuperTokensConfig);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MatProgressSpinner, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'diplomska-angular';

  constructor(protected readonly spinnerService: SpinnerService) {
  }
}
