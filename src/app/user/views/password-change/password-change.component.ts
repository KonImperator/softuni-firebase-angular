import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { passwordValidator } from 'src/app/shared/validators/password-validator';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css'],
})
export class PasswordChangeComponent {
  error: string | null = null;
  success: string | null = null;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  form: FormGroup = this.fb.group(
    {
      currPass: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
        ],
      ],
      rePass: ['', [Validators.required]],
    },
    { validators: [passwordValidator(false), passwordValidator(true)] },
  );

  hideMessage() {
    this.error = null;
    this.success = null;
  }

  onSubmit() {
    if (this.form.invalid) {
      return alert('Invalid input');
    }

    this.isLoading = true;

    const [currPass, newPass] = [
      this.form.value.currPass,
      this.form.value.password,
    ];

    this.userService.changePassword(currPass, newPass)
    .then(() => this.handleCompleteMessage())
    .catch((err) => this.handleCompleteMessage(err.message));
  }

  handleCompleteMessage(err?: string) {
    this.isLoading = false;
    err
      ? (this.error = err)
      : (this.success = 'Password updated successfully!');
    const timeout = setTimeout(() => {
      this.success = null;
      this.error = null;
      clearTimeout(timeout);
    }, 5000);
  }
}
