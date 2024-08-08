import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CinemaHallLayoutComponent } from './features/cinema-hall-layout/cinema-hall-layout.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HeaderComponent } from './shared/layout/header/header.compoonent';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SharedModule,
    FooterComponent,
    HeaderComponent,
    CinemaHallLayoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'team5-ed7';
}
