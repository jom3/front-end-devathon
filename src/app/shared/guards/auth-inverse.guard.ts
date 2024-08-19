import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services';
import { inject } from '@angular/core';

export const authInverseGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const isTokenActive = inject(JwtService)
  if(isTokenActive.getIsActiveToken()){
    router.navigate(['/'])
    return false
  }else{
    return true
  }
};
