import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./home/home-routing').then(r=>r.routes)
  },
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth-routing').then(r=>r.routes)
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./movies/movies.routes').then((m) => m.MOVIES_ROUTES),
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
