import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function passwordValidator(equalRequired: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    
    const form = control as FormGroup;
    
    if (equalRequired) {
      return form.get('password')?.value === form.get('rePass')?.value
        ? null
        : { passwordsDifferent: true };
    }
    return form.get('currPass')?.value !== form.get('password')?.value
      ? null
      : { passwordsEqual: true };
  };
}
