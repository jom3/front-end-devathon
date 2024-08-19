import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TermsAndConditionsComponent } from '../../components/modals/terms-and-conditions/terms-and-conditions.component';

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
}
