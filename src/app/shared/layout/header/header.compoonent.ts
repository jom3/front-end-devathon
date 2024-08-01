import { Component, effect, inject, signal } from '@angular/core';
import { MatDialog, MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../../auth';
import { Router, RouterLink } from '@angular/router';
import { JwtService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatDialogModule,MatDialogClose, RouterLink],
})
export class HeaderComponent {
  public isLogged = signal<boolean>(false)

  readonly dialog = inject(MatDialog);
  readonly jwtSvc = inject(JwtService)
  readonly router = inject(Router)

  constructor(){
    effect(()=>{
      this.isLogged.set(this.jwtSvc.isLogged())
    },{
      allowSignalWrites:true
    })
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent,{
      width:'400px',
    });
  }

  onLogout(){
    this.jwtSvc.removeToken()
    this.router.navigate(['/'])
  }
}
