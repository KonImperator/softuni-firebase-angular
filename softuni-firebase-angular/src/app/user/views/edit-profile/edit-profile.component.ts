import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor(private userService: UserService, private fb: FormBuilder) {}

  get user() {
    return this.userService.user;
  }

  form: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    displayName: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required]],
  });

  onSubmit() {}
}
