import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from 'src/app/shared/validators/password-validator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {}

  error: string | null = null;
  isLoading: boolean = false;

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    passwords: this.fb.group(
      {
        password: ['', [
            Validators.required,
            Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
          ],
        ],
        rePass: ['', [Validators.required]],
      },
      { validators: [passwordValidator()] }
    ),
  });

  onSubmit() {
    if (this.form.invalid) {
      return alert('Invalid input');
    }

    this.isLoading = true;
    this.error = null;

    this.userService
      .register(this.form.value)
      .then(() => this.router.navigate(['/']))
      .catch((err) => {
        this.error = err.message;
        setTimeout(() => {
          this.error = null;
        }, 5000);
      })
      .finally(() => (this.isLoading = false));
  }

  ngOnInit(): void {}
}
