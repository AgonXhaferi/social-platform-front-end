import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (await authService.checkAuthStatus()) {
    return true;
  } else {
    return router.navigate(['/login'])
      .then(
        () => false
      );
  }
};
