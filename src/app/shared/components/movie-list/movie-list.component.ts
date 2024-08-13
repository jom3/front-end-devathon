import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { TitleCasePipe } from '@angular/common';
import { Movie } from '../../models/movie.interface';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'movie-list',
  standalone: true,
  imports: [MovieCardComponent, TitleCasePipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  title = input.required<string>()
  movies = input.required<Movie[]>()
}
