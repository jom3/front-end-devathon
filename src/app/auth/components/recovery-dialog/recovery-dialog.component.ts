import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomMessageService } from '../../../shared';
import { AuthService } from '../../services';
import { MessageType } from '../../../shared/services/custom-message.service';

@Component({
  selector: 'app-recovery-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,],
  templateUrl: './recovery-dialog.component.html',
  styleUrl: './recovery-dialog.component.css'
})
export class RecoveryDialogComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authSvc = inject(AuthService)
  readonly _snackBar = inject(CustomMessageService)

  recoveryForm = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
  })

  onRecover(){
    if(this.recoveryForm.invalid){
      this.recoveryForm.markAllAsTouched()
      return;
    }
    const recoveryData = this.recoveryForm.getRawValue()

    this.authSvc.recoverPassword(recoveryData.email!).subscribe({
      next:r=>this._snackBar.showCustomMessage({message:'Se enviaron las instrucciones a tu correo!',type:MessageType.info}),
      error:e=>console.log(e)
    })
  }
}
