import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router, type CanActivateChildFn } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { AuthStore } from '@shared/store';

export const noAuthGuard: CanActivateChildFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  return toObservable(authStore.isAuthLoading).pipe(
    filter((isLoading) => !isLoading),
    take(1),
    map(() => !authStore.isLoggedIn() ? true : router.createUrlTree(['/'])),
  );
};
