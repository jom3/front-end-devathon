import { Routes } from "@angular/router";

export const routes:Routes = [
  {
    path:'register',
    loadComponent:()=>import('./pages/register-page/register-page.component').then(c=>c.RegisterPageComponent)
  }
]
