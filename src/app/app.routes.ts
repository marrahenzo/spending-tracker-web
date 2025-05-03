import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OperationDetailComponent } from './views/operation-detail/operation-detail.component';
import { HomeComponent } from './views/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'operation-detail/{id}',
        component: OperationDetailComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];
