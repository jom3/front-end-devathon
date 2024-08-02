import { JsonPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../modules/material/material.module';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [MaterialModule, JsonPipe],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css',
})
export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
