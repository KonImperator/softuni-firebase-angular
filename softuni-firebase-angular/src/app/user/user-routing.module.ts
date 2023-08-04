import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { EditProfileComponent } from './views/edit-profile/edit-profile.component';
import { PasswordChangeComponent } from './views/password-change/password-change.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: '', pathMatch:'full', redirectTo: 'edit' },
      { path: 'edit', component: EditProfileComponent },
      { path: 'change-password', component: PasswordChangeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
