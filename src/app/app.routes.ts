import { Routes } from '@angular/router';
import { authInverseGuard } from './shared/guards/auth-inverse.guard';

export const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./home/home-routing').then(r=>r.routes)
  },
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth-routing').then(r=>r.routes),
    canActivate:[authInverseGuard]
  },
  {
    path:'user/update-user/:id',
    loadComponent:()=>import('./auth/pages/register-page/register-page.component').then(c=>c.RegisterPageComponent),
    canActivate:[authInverseGuard]
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
