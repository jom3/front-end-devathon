import { Component } from '@angular/core';
import {
  CarouselComponent,
  JoinUsAdComponent,
  MoviePostersComponent,
  WorkAdComponent,
} from '../../components';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CarouselComponent,
    JoinUsAdComponent,
    MoviePostersComponent,
    WorkAdComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
