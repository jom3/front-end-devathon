import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TermsAndConditionsComponent } from '../../components/modals/terms-and-conditions/terms-and-conditions.component';
import { PrivacyStatementComponent } from '../../components/modals/privacy-statement/privacy-statement.component';
import { AboutUsComponent } from '../../components/modals/about-us/about-us.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [],
})
export class FooterComponent {
  readonly dialog = inject(MatDialog);

  openTermsAndConditionsDialog(): void {
    this.dialog.open(TermsAndConditionsComponent,{});
  }

  openPrivacyStatement(): void {
    this.dialog.open(PrivacyStatementComponent,{});
  }

  openAboutUsDialog(): void {
    this.dialog.open(AboutUsComponent,{});
  }
}
