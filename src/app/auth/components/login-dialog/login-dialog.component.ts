import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { AuthService } from '../../services';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { CustomMessageService, JwtService } from '../../../shared/services';
import { MessageType } from '../../../shared/services/custom-message.service';
import { RecoveryDialogComponent } from '../recovery-dialog/recovery-dialog.component';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {
  readonly fb = inject(FormBuilder)
  readonly _snackBar = inject(CustomMessageService)
  private readonly authSvc = inject(AuthService)
  private readonly jwtSvc = inject(JwtService)
  readonly dialog = inject(MatDialog);

  loginForm = this.fb.group({
    username: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]]
  })

  onLogin(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
    }
    const loginData = this.loginForm.getRawValue()

    this.authSvc.signIn(loginData.username!, loginData.password!).subscribe({
      next:r=>{
        this.jwtSvc.setToken(r)
        this._snackBar.showCustomMessage({message:'Inicio de sesión correcto', type:MessageType.success})
      },
      error:e=>console.log(e)
    })
  }

  onGoogleRegistration(){
    this.authSvc.googleRegistration().subscribe({
      next:r=> this._snackBar.showCustomMessage({message:'Se envió instrucciones a su correo', type:MessageType.success}),
      error:e=> this._snackBar.showCustomMessage({message:'Error al registrarse con google', type:MessageType.warn})
    })
  }

  openRecoveryDialog() {
    this.dialog.open(RecoveryDialogComponent,{
      width:'400px',
    });
  }
}
