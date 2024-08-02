import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'movies',
    loadChildren: () =>
      import('./pages/movies.routes').then((m) => m.MOVIES_ROUTES),
  },

  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
