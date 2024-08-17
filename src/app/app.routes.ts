import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {CulturesComponent} from './components/cultures/cultures.component';
import {CultureUsersComponent} from './components/culture-users/culture-users.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {ChatComponent} from './components/chat/chat.component';
import {authGuard} from './guards/auth.guard';
import {CultureUsersDisplayComponent} from "./components/culture-users-display/culture-users-display.component";

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],  // Protecting the profile route
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [authGuard],  // Protecting the welcome route
  },
  {
    path: 'cultures',
    component: CulturesComponent,
    canActivate: [authGuard],  // Protecting the cultures route
  },
  {
    path: 'cultures/:cultureName',
    component: CultureUsersComponent,
    canActivate: [authGuard],  // Protecting the culture users route
  },
  {
    path: 'cultures/users-culture/:cultureName',
    component: CultureUsersDisplayComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users/:userId',
    component: UserProfileComponent,
    canActivate: [authGuard],  // Protecting the user profile route
  },
  {
    path: 'chat/:chatId',
    component: ChatComponent,
    canActivate: [authGuard],  // Protecting the chat route
  },
];
