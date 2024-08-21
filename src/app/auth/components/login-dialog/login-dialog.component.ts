import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { AuthService } from '../../services';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
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
export class LoginDialogComponent implements OnInit {
  readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  readonly _snackBar = inject(CustomMessageService)
  private readonly authSvc = inject(AuthService)
  private readonly jwtSvc = inject(JwtService)
  readonly dialog = inject(MatDialog);

  loginForm = this.fb.group({
    username: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]]
  })

   ngOnInit(): void {
    setTimeout(() => {
      this.onGoogleRegistration();
    }, 1500)
  }

  onLogin(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
    }
    const loginData = this.loginForm.getRawValue()

    this.authSvc.signIn(loginData.username!, loginData.password!).subscribe({
      next:r=>{
        this.jwtSvc.setToken(r)
        this._snackBar.showCustomMessage({message:'Inicio de sesión correcto', type:MessageType.success})
        this.router.navigate(['/'])
      },
      error:e=>console.log(e)
    })
  }

  openRecoveryDialog() {
    this.dialog.open(RecoveryDialogComponent,{
      width:'400px',
    });
  }

  // Logueo con Google
  loginGoogle() {
    this.authSvc.loginWithGoogle();
  }

  onGoogleRegistration() {
    this.authSvc.googleRegistration().subscribe({
      next: (r: any) => {
        this.jwtSvc.setToken(r)
        this._snackBar.showCustomMessage({message:'Inicio de sesión correcto', type:MessageType.success})
      },
      error: (e: any) => {
        this.loginForm.reset()
      }
    })
  }
}
