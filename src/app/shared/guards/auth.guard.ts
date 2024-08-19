import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const isTokenActive = inject(JwtService)
  const router = inject(Router)

  if(isTokenActive.getIsActiveToken()){
    return true
  }else{
    router.navigate(['/'])
    return false
  }
};
