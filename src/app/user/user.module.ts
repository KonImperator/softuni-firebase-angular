import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { PasswordChangeComponent } from './views/password-change/password-change.component';
import { EditProfileComponent } from './views/edit-profile/edit-profile.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent, PasswordChangeComponent, EditProfileComponent],
  imports: [CommonModule, RouterModule, UserRoutingModule, ReactiveFormsModule, SharedModule],
})
export class UserModule {}
