import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomMessageService } from '../../../shared';
import { AuthService } from '../../services';
import { passwordStrengthValidator, passwordMatchValidator } from '../../validators/custom-match.validator';
import { MessageType } from '../../../shared/services/custom-message.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-recovery-page',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatButtonModule,ReactiveFormsModule,MatCheckboxModule],
  templateUrl: './recovery-page.component.html',
  styleUrl: './recovery-page.component.css'
})
export class RecoveryPageComponent {
  id = input<string>();
  readonly fb = inject(FormBuilder)
  private readonly authSvc = inject(AuthService)
  private readonly router = inject(Router)
  private readonly _snackbarSvc = inject(CustomMessageService)

  recoveryForm = this.fb.group({
    password:['',[Validators.required, Validators.minLength(8), Validators.maxLength(20), passwordStrengthValidator()]],
    confirmPassword:['',[Validators.required]],
    IsChecked:[false, [Validators.requiredTrue]]
  },{
    validators:[passwordMatchValidator('password','confirmPassword')]
  })

  onRecovery(){
    if(this.recoveryForm.invalid){
      this.recoveryForm.markAllAsTouched()
      return;
    }
    const newPasswordData = this.recoveryForm.getRawValue()
    this.authSvc.changePassword(this.id()!,newPasswordData.password!, newPasswordData.confirmPassword!).subscribe({
      next:r=> {
        this._snackbarSvc.showCustomMessage({message:'Contraseña modificada con exito', type:MessageType.success})
        this.router.navigate(['/'])
      },
      error:e=>console.log(e)
    })
  }
}
