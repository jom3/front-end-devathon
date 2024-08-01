import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomMessageCardComponent } from '../components';

export enum MessageType{
  info = 'INFO',
  success = 'SUCCESS',
  warn = 'WARN'
}

interface CustomData{
  message:string,
  type: MessageType,
}

@Injectable({
  providedIn: 'root'
})
export class CustomMessageService {

  readonly _snackBar = inject(MatSnackBar)

  showCustomMessage({message, type}:CustomData){
    this._snackBar.openFromComponent(CustomMessageCardComponent,{
      duration:2000,
      data:{
        message,
        type
      },
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })
  }
}
