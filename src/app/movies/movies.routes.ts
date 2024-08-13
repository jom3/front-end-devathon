import { Routes } from '@angular/router';

export const MOVIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent:()=>import('./pages/movies/movies-page.component').then(c=>c.MoviesPageComponent)
  },
  {
    path: 'showmovie/:movieId',
    loadComponent:()=>import('./pages/show-movie/show-movie.component').then(c=>c.ShowMovieComponent),
    children:[
      {
        path:'', loadComponent:()=> import('./pages/movie-ticket-page/movie-ticket-page.component').then(c=>c.MovieTicketPageComponent)
      }
    ]
  },
];
