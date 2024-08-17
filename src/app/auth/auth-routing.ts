import { Routes } from "@angular/router";

export const routes:Routes = [
  {
    path:'register',
    loadComponent:()=>import('./pages/register-page/register-page.component').then(c=>c.RegisterPageComponent)
  },
  {
    path:'recovery-password/:id',
    loadComponent:()=>import('./pages/recovery-page/recovery-page.component').then(c=>c.RecoveryPageComponent)
  }
]
