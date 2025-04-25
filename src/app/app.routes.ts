import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ContactListComponent } from './pages/contact-list/contact-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, children: [
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'contact-list', component: ContactListComponent }
  ] },
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];
