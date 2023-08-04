import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/shared/validators/password-validator';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent {

  constructor(private fb: FormBuilder) {}

  form: FormGroup = this.fb.group({
    currPass: ['', [Validators.required]],
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

  }
}
