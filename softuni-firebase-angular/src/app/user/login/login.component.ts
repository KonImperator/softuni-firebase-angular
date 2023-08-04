import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  isLoading: boolean = false;
  error: string | null = null;

  onSubmit() {
    if (this.form.invalid) {
      return alert('Invalid input');
    }
    this.error = null;
    this.isLoading = true;

    this.userService
      .login(this.form.value.email, this.form.value.password)
      .then((user) => {
        console.log(user)
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.error = err.message;
        setTimeout(() => {
          this.error = null;
        }, 5000);
      })
      .finally(() => (this.isLoading = false));
  }
}
