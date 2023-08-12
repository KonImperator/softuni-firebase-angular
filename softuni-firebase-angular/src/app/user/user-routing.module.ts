import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { EditProfileComponent } from './views/edit-profile/edit-profile.component';
import { PasswordChangeComponent } from './views/password-change/password-change.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: 'login', component: LoginComponent, data: { loginRequired: false }, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, data: { loginRequired: false }, canActivate: [AuthGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: '', pathMatch:'full', redirectTo: 'edit' },
      { path: 'edit', component: EditProfileComponent, data: { loginRequired: true }, canActivate: [AuthGuard] },
      { path: 'change-password', component: PasswordChangeComponent, data: { loginRequired: true }, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
