import { Routes } from '@angular/router';
import { ShowMovieComponent } from './pages/show-movie/show-movie.component';

export const routes: Routes = [
  {
    path: 'movies',
    loadComponent: () =>
      import('./pages/movies/movies-page.component').then(
        (c) => c.MoviesPageComponent
      ),
  },
  {
    path: 'show-movie/:movieId',
    component: ShowMovieComponent,
  },
  {
    path: '**',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
];
