import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {CulturesComponent} from "./components/cultures/cultures.component";
import {CultureUsersComponent} from "./components/culture-users/culture-users.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {ChatComponent} from "./components/chat/chat.component";


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
  },
  {
    path: 'welcome', component: WelcomeComponent
  },
  {
    path: 'cultures', component: CulturesComponent
  },
  {
    path: 'cultures/:cultureName', component: CultureUsersComponent
  },
  {
    path: 'users/:userId', component: UserProfileComponent
  },
  {
    path: 'chat', component: ChatComponent
  }
];
