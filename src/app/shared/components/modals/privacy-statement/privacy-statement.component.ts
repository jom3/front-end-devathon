import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-privacy-statement',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule,MatDialogClose],
  templateUrl: './privacy-statement.component.html',
  styleUrl: './privacy-statement.component.css'
})
export class PrivacyStatementComponent {
  public email = signal<string>('slowmoviessupport@gmail.com')

}
