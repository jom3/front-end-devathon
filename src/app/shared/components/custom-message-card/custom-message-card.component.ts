import { NgClass, NgStyle } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'custom-message-card',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './custom-message-card.component.html',
  styleUrl: './custom-message-card.component.css'
})
export class CustomMessageCardComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<CustomMessageCardComponent>
  ) {
    console.log(data.type)
  }

  dismiss() {
    this.snackBarRef.dismiss();
  }
}
