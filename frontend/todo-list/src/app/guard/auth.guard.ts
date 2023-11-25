import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  var result = await authService.startWithTimeout();
  if (!result) {
    return router.createUrlTree(['']);
  }
  if (localStorage.getItem('x-auth-id') == null) {
    return router.createUrlTree(['/login']);
  } else {
    var result = await authService.checkSession();
    if (!result) {
      return router.createUrlTree(['/login']);
    }
  }
  return result;
};
