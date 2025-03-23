import { Component, effect, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../../auth';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { JwtService } from '../../services';
import { NgClass } from '@angular/common';
import { MaterialModule } from '../../modules/material/material.module';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '../../../auth/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MaterialModule, RouterLink, NgClass, RouterLinkActive],
})
export class HeaderComponent {
  public isHidden = signal<boolean>(true);
  public isLogged = signal<boolean>(false);

  readonly dialog = inject(MatDialog);
  readonly jwtSvc = inject(JwtService);
  readonly router = inject(Router);
  readonly auththSvc = inject(AuthService);

  constructor() {
    effect(
      () => {
        this.isLogged.set(this.jwtSvc.isLogged());
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  openLoginDialog() {
    this.isHidden.set(true);
    this.dialog.open(LoginDialogComponent, {
      width: '400px',
    });
  }

  onLogout() {
    this.auththSvc.logout();
    this.jwtSvc.removeToken();
    this.isHidden.set(true);
    this.router.navigate(['/']);
  }

  onToggle() {
    this.isHidden.set(!this.isHidden());
  }
}
