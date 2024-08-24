import { Component, inject, input, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  emailMatchValidator,
  passwordMatchValidator,
  passwordStrengthValidator,
} from '../../validators/custom-match.validator';
import { AuthService } from '../../services';
import { User } from '../../models/user.interface';
import { Router } from '@angular/router';
import { CustomMessageService, JwtService } from '../../../shared/services';
import { MessageType } from '../../../shared/services/custom-message.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  user!: User;
  id = input<string>();
  public hasPath = signal<boolean>(false);
  readonly fb = inject(FormBuilder);
  private readonly authSvc = inject(AuthService);
  private readonly userSvc = inject(UserService);
  private readonly router = inject(Router);
  private readonly _snackbarSvc = inject(CustomMessageService);
  private readonly jwtSvc = inject(JwtService);

  constructor() {
    if (this.router.url.includes('/user/update-user')) {
      this.hasPath.set(true);
      this.userSvc.getUserById(this.id()!).subscribe({
        next: (r) => (this.user = r),
      });
    } else {
      this.hasPath.set(false);
    }
  }

  registerForm = this.fb.group(
    {
      fullName: ['John Doe', [Validators.required]],
      phone: ['123'],
      country: ['Spain', [Validators.required]],
      dni: ['12345678F', [Validators.required]],
      genre: ['Masculino', [Validators.required]],
      email: ['mole@mole.com', [Validators.required, Validators.email]],
      confirmEmail: [
        this.hasPath() ? this.user.email : '',
        [Validators.required],
      ],
      password: [
        'Adil123!',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          passwordStrengthValidator(),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      IsChecked: [false, [Validators.requiredTrue]],
    },
    {
      validators: [
        emailMatchValidator('email', 'confirmEmail'),
        passwordMatchValidator('password', 'confirmPassword'),
      ],
    }
  );

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.user = {
      fullName: this.registerForm.controls.fullName.value!,
      email: this.registerForm.controls.email.value!,
      password: this.registerForm.controls.password.value!,
      dni: this.registerForm.controls.dni.value!,
      genre: this.registerForm.controls.genre.value!,
      phone: this.registerForm.controls.phone.value!,
      country: this.registerForm.controls.country.value!,
    };
    if (this.hasPath() == true) {
      this.userSvc.updateUser(this.id()!, this.user).subscribe({
        next: (r) => {
          this._snackbarSvc.showCustomMessage({
            message: 'Usuario modificado con éxito',
            type: MessageType.success,
          });
        },
        error: (e) => console.log(e),
      });
    }
    this.authSvc.signUp(this.user).subscribe({
      next: (r) => {
        this.jwtSvc.setToken(r);
        this._snackbarSvc.showCustomMessage({
          message: 'Usuario registrado con éxito',
          type: MessageType.success,
        });
        this.router.navigate(['/']);
      },
      error: (e) => console.log(e),
    });
  }
}
