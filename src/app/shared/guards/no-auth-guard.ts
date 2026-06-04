import { inject } from '@angular/core';
import { Router, type CanActivateChildFn } from '@angular/router';
import { AuthStore } from '@shared/store';

export const noAuthGuard: CanActivateChildFn = (childRoute, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  return authStore.isLoggedIn() ? router.createUrlTree(['/']) : true;
};
