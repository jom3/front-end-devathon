import { Component } from '@angular/core';
import {
  CarouselComponent,
  MoviePostersComponent,
} from '../../components';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CarouselComponent,
    MoviePostersComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
