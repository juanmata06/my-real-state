import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, catchError, filter, map, of, switchMap, takeUntil } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { User } from '@supabase/supabase-js';
import { jwtDecode } from 'jwt-decode';
import { ApiDataService, AuthService, LocalStorageService } from '@shared/services';
import { TokenStore } from './token.store';
import { UserLogin, UserRegister } from '@shared/models';

type AuthState = {
  user: User | null;
  token: string | null;
  userRole: string;
  rolePermissions: string;
  isAuthLoading: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  userRole: '',
  rolePermissions: '',
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
      apiDataService = inject(ApiDataService),
      localStorageService = inject(LocalStorageService),
      tokenStore = inject(TokenStore),
      destroy$ = new Subject<void>(),
      router: Router = inject(Router),
    ) => ({
      destroySubject: () => destroy$,
      validateUserLogged(): Promise<void> {
        console.log('Validating user logged');
        patchState(store, {
          isAuthLoading: true,
        });
        const token = localStorageService.getUserToken();
        if (!token) {
          patchState(store, {
            userRole: '',
            rolePermissions: '',
            isAuthLoading: false,
          });
          return Promise.resolve();
        }
        patchState(store, {
          token: token,
        });
        return new Promise<void>((resolve) => {
          authService
            .getUser(token)
            .pipe(
              switchMap((user) => {
                if (!user) {
                  patchState(store, {
                    user: null,
                    token: null,
                    userRole: '',
                    rolePermissions: '',
                    isAuthLoading: false,
                  });
                  tokenStore.setToken('');
                  localStorageService.deleteUserToken();
                  return of(null);
                }

                const decodedToken: { user_role?: string } = jwtDecode(token);
                const userRole = decodedToken.user_role;

                if (!userRole) {
                  return of({ user, userRole: '', rolePermissions: '' });
                }

                return apiDataService.getRolePermissionsByRole(userRole).pipe(
                  map(({ data: permissions }) => ({
                    user,
                    userRole,
                    rolePermissions: permissions
                  })),
                  catchError((rpcError) => {
                    console.error('Get role permissions error:', rpcError);
                    return of({ user, userRole, rolePermissions: '' });
                  }),
                );
              }),
              takeUntil(destroy$),
            )
            .subscribe((result) => {
              if (result) {
                patchState(store, {
                  user: result.user,
                  token: token,
                  userRole: result.userRole,
                  rolePermissions: result.rolePermissions,
                  isAuthLoading: false,
                });
                console.log({
                  user: store.user(),
                  token: store.token(),
                  userRole: store.userRole(),
                  rolePermissions: store.rolePermissions(),
                  isAuthLoading: store.isAuthLoading(),
                });
              }
              resolve();
            });
        });
      },
      loginUser: (credentials: UserLogin): void => {
        patchState(store, { isAuthLoading: true });
        authService
          .loginUser(credentials)
          .pipe(
            switchMap(({ data, error }) => {
              if (error || !data.session) {
                console.error('Login error:', error?.message);
                patchState(store, { isAuthLoading: false });
                return of(null);
              }

              const token = data.session.access_token;
              tokenStore.setToken(token);
              localStorageService.saveUserToken(token);

              const decodedToken: { user_role?: string } = jwtDecode(token);
              const userRole = decodedToken.user_role;

              if (!userRole) {
                return of({ data, userRole: '', rolePermissions: '' });
              }

              return apiDataService.getRolePermissionsByRole(userRole).pipe(
                map(({ data: permissions }) => ({
                  data,
                  userRole,
                  rolePermissions: permissions,
                })),
                catchError((rpcError) => {
                  console.error('Get role permissions error:', rpcError);
                  return of({ data, userRole, rolePermissions: '' });
                }),
              );
            }),
            takeUntil(destroy$),
          )
          .subscribe((result) => {
            if (!result) {
              return;
            }

            const token = result.data.session.access_token;
            patchState(store, {
              user: result.data.user,
              token: token,
              userRole: result.userRole,
              rolePermissions: result.rolePermissions,
              isAuthLoading: false,
            });
            console.log({
              user: store.user(),
              token: store.token(),
              userRole: store.userRole(),
              rolePermissions: store.rolePermissions(),
              isAuthLoading: store.isAuthLoading(),
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
            switchMap(({ data, error }) => {
              if (error || !data.session) {
                console.error('Login after register error:', error?.message);
                patchState(store, { isAuthLoading: false });
                return of(null);
              }

              const token = data.session.access_token;
              tokenStore.setToken(token);
              localStorageService.saveUserToken(token);

              const decodedToken: { user_role?: string } = jwtDecode(token);
              const userRole = decodedToken.user_role;

              if (!userRole) {
                return of({ data, userRole: '', rolePermissions: '' });
              }

              return apiDataService.getRolePermissionsByRole(userRole).pipe(
                map(({ data: permissions }) => ({
                  data,
                  userRole,
                  rolePermissions: permissions
                })),
                catchError((rpcError) => {
                  console.error('Get role permissions error:', rpcError);
                  return of({ data, userRole, rolePermissions: '' });
                }),
              );
            }),
            takeUntil(destroy$),
          )
          .subscribe((result) => {
            if (!result) {
              return;
            }

            const token = result.data.session.access_token;
            
            patchState(store, {
              user: result.data.user,
              token: token,
              userRole: result.userRole,
              rolePermissions: result.rolePermissions,
              isAuthLoading: false,
            });
            console.log({
              user: store.user(),
              token: store.token(),
              userRole: store.userRole(),
              rolePermissions: store.rolePermissions(),
              isAuthLoading: store.isAuthLoading(),
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
                userRole: '',
                rolePermissions: '',
                isAuthLoading: false,
              });
              tokenStore.setToken('');
              localStorageService.deleteUserToken();
              router.navigate(['/']);
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
    onInit(store) {
      store.validateUserLogged();
    },
    onDestroy(store) {
      store.destroySubject().next();
      store.destroySubject().complete();
    },
  }),
);
