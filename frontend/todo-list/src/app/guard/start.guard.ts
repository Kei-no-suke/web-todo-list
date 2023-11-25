import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const startGuard: CanActivateFn = async (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  var result = await authService.startWithTimeout();
  if (!result) {
    return router.createUrlTree(['']);
  }
  return true;
};
