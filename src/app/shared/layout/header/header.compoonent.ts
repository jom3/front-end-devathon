import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../components';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatDialogModule],
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent,{
      width:'400px'
    });
  }
}
