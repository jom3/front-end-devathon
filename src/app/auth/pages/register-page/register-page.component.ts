import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailMatchValidator, passwordMatchValidator, passwordStrengthValidator } from '../../validators/custom-match.validator';
import { AuthService } from '../../services';
import { User } from '../../models/user.interface';
import { Router } from '@angular/router';
import { CustomMessageService, JwtService } from '../../../shared/services';
import { MessageType } from '../../../shared/services/custom-message.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,MatCheckboxModule,MatButtonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  readonly fb = inject(FormBuilder)
  private readonly authSvc = inject(AuthService)
  private readonly router = inject(Router)
  private readonly _snackbarSvc = inject(CustomMessageService)
  private readonly jwtSvc = inject(JwtService)

  registerForm = this.fb.group({
    fullName: ['',[Validators.required]],
    phone:[''],
    country:[''],
    dni:[''],
    genre:['',[Validators.required]],
    email:['', [Validators.required, Validators.email]],
    confirmEmail:['',[Validators.required]],
    password:['',[Validators.required, Validators.minLength(8), Validators.maxLength(20), passwordStrengthValidator()]],
    confirmPassword:['',[Validators.required]],
    IsChecked:[false, [Validators.requiredTrue]]
  },{
    validators:[emailMatchValidator('email','confirmEmail'), passwordMatchValidator('password','confirmPassword')]
  })

  onRegister(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched()
      return;
    }
    const user:User = {
      fullName:this.registerForm.controls.fullName.value!,
      email: this.registerForm.controls.email.value!,
      password:this.registerForm.controls.password.value!,
      dni:this.registerForm.controls.dni.value!,
      genre:this.registerForm.controls.genre.value!,
      phone:this.registerForm.controls.phone.value!,
      country:this.registerForm.controls.fullName.value!
    }
    this.authSvc.signUp(user).subscribe({
      next:r=>{
        this.jwtSvc.setToken(r)
        this._snackbarSvc.showCustomMessage({message:'Usuario registrado con éxito',type:MessageType.success})
        this.router.navigate(['/'])
      },
      error:e=>console.log(e)
    })
  }
}
