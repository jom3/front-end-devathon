import { Routes } from '@angular/router';
import { MoviesPageComponent } from './movies/movies-page.component';
import { ShowMovieComponent } from './show-movie/show-movie.component';

export const MOVIES_ROUTES: Routes = [
  {
    path: '',
    component: MoviesPageComponent,
  },
  {
    path: 'showmovie/:movieId',
    component: ShowMovieComponent,
  },
];
