import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {


  const authService = inject (AuthService);
  const router = inject(Router);

  if(authService.authStatus() === AuthStatus.autenticated){
    return true;
  }

  // if(authService.authStatus() ===AuthStatus.checking){
  //   return false;
  // }




  // const url = state.url;
  //console.log({status: authService.authStatus()});

  // console.log('sAuthenticatedGuard');
  // localStorage.setItem('url', url);

  router.navigateByUrl('/auth/login')
  return false;
};
