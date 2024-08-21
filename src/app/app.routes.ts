import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {CulturesComponent} from './components/cultures/cultures.component';
import {CultureContentComponent} from './components/culture-content/culture-content.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {ChatComponent} from './components/chat/chat.component';
import {authGuard} from './guards/auth.guard';
import {CultureUsersDisplayComponent} from "./components/culture-users-display/culture-users-display.component";
import {CultureArticlesComponent} from "./components/culture-articles/culture-articles.component";
import {CultureEventsComponent} from "./components/culture-events/culture-events.component";
import {FileUploadDialogComponent} from "./components/file-upload-dialog/file-upload-dialog.component";
import {ArchiveComponent} from "./components/archive/archive.component";

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
    component: CultureContentComponent,
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
    path: 'cultures/culture-articles/:cultureName',
    component: CultureArticlesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'cultures/culture-events/:cultureName',
    component: CultureEventsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'chat/:chatId',
    component: ChatComponent,
    canActivate: [authGuard],  // Protecting the chat route
  },
  {
    path: 'file',
    component: ArchiveComponent,
  }
];
