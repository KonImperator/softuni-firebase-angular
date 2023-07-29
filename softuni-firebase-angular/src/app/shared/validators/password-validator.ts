import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
    return (controlGroup: AbstractControl): ValidationErrors | null => {
      return controlGroup.get('password')?.value === controlGroup.get('rePass')?.value ? null : { passwordInvalid: true }
    };
  }