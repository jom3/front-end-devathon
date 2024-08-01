import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailMatchValidator(email: string, confirmEmail: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const emailControl = formGroup.get(email);
    const confirmEmailControl = formGroup.get(confirmEmail);

    if (!emailControl || !confirmEmailControl) {
      return null;
    }

    if (confirmEmailControl.errors && !confirmEmailControl.errors['emailMismatch']) {
      return null;
    }

    if (emailControl.value !== confirmEmailControl.value) {
      confirmEmailControl.setErrors({ emailMismatch: true });
    } else {
      confirmEmailControl.setErrors(null);
    }

    return null;
  };
}

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value || '';


    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);

    const isValid = hasLowercase && hasUppercase && hasNumber && hasSymbol;

    return isValid ? null : { passwordStrength: true };
  };
}

export function passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const passwordControl = formGroup.controls[password];
    const confirmPasswordControl = formGroup.controls[confirmPassword];

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };
}
