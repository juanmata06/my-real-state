import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, filter, switchMap, takeUntil, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { User } from '@supabase/supabase-js';
import { AuthService, LocalStorageService } from '@shared/services';
import { TokenStore } from './token.store';
import { UserLogin, UserRegister } from '@shared/models';

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthLoading: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthLoading: true,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(initialState),
  withComputed((state) => ({
    isLoggedIn: computed(() => state.user() && state.token()),
  })),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      localStorageService = inject(LocalStorageService),
      tokenStore = inject(TokenStore),
      destroy$ = new Subject<void>(),
      router: Router = inject(Router),
    ) => ({
      destroySubject: () => destroy$,
      validateUserLogged(): Promise<void> {
        console.log('Validating user logged');
        const token = localStorageService.getUserToken();
        if (!token) {
          return Promise.resolve();
        }
        patchState(store, {
          user: null,
          token: token,
          isAuthLoading: true,
        });
        return new Promise<void>((resolve) => {
          authService
            .getUser(token)
            .pipe(takeUntil(destroy$))
            .subscribe((user) => {
              if (user) {
                patchState(store, {
                  user: user,
                  token: token,
                  isAuthLoading: false,
                });
              } else {
                // Token invalid, clear state
                patchState(store, {
                  user: null,
                  token: null,
                  isAuthLoading: false,
                });
                tokenStore.setToken('');
                localStorageService.deleteUserToken();
              }
              resolve();
            });
        });
      },
      loginUser: (credentials: UserLogin): void => {
        patchState(store, { isAuthLoading: true });
        authService
          .loginUser(credentials)
          .pipe(takeUntil(destroy$))
          .subscribe(({ data, error }) => {
            if (error || !data.session) {
              console.error('Login error:', error?.message);
              patchState(store, { isAuthLoading: false });
              return;
            }
            const token = data.session.access_token;
            tokenStore.setToken(token);
            localStorageService.saveUserToken(token);
            patchState(store, {
              user: data.user,
              token: token,
              isAuthLoading: false,
            });
            router.navigate(['/']);
          });
      },
      registerUser: (credentials: UserRegister): void => {
        patchState(store, { isAuthLoading: true });
        authService
          .registerUser(credentials)
          .pipe(
            filter(({ error }) => {
              if (error) {
                console.error('Register error:', error.message);
                patchState(store, { isAuthLoading: false });
                return false;
              }
              return true;
            }),
            switchMap(() =>
              authService.loginUser({
                email: credentials.email,
                password: credentials.password,
              }),
            ),
            takeUntil(destroy$),
          )
          .subscribe(({ data, error }) => {
            if (error || !data.session) {
              console.error('Login after register error:', error?.message);
              patchState(store, { isAuthLoading: false });
              return;
            }
            const token = data.session.access_token;
            tokenStore.setToken(token);
            localStorageService.saveUserToken(token);
            patchState(store, {
              user: data.user,
              token: token,
              isAuthLoading: false,
            });
            router.navigate(['/']);
          });
      },
      logOutUser: (): void => {
        patchState(store, { isAuthLoading: true });
        authService
          .signOut()
          .pipe(takeUntil(destroy$))
          .subscribe({
            next: () => {
              patchState(store, {
                user: null,
                token: null,
                isAuthLoading: false,
              });
              tokenStore.setToken('');
              localStorageService.deleteUserToken();
            },
            error: (err) => {
              console.error('SignOut error:', err);
              patchState(store, { isAuthLoading: false });
            },
          });
      },
    }),
  ),
  withHooks({
    // onInit(store) {
    //   store.validateUserLogged();
    // },
    onDestroy(store) {
      store.destroySubject().next();
      store.destroySubject().complete();
    },
  }),
);
