import { CanActivateFn } from '@angular/router';
import { JwtService } from '../services';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const isTokenActive = inject(JwtService)
  if(isTokenActive.getIsActiveToken()){
    return true
  }else{
    return false
  }
};
