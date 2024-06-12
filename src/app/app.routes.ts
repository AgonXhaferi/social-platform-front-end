import {Routes} from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";

export const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full',
  },
  {
    path: 'register', component: RegisterComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'profile', component: ProfileComponent
  }
];
