import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@layouts/landing-area/landing-area'),
    children: [
      {
        path: '',
        loadComponent: () => import('@features/landing/pages/landing-page/landing-page'),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  //   {
  //     path: 'auth',
  //     loadComponent: () => import('@layouts/auth-area/auth-area'),
  //     children: [
  //       {
  //         path: 'login',
  //         loadComponent: () => import('@features/auth/pages/login-page/login-page'),
  //         title: 'Login',
  //       },
  //       {
  //         path: 'register',
  //         loadComponent: () => import('@features/auth/pages/register-page/register-page'),
  //         title: 'Register',
  //       },
  //       {
  //         path: '**',
  //         redirectTo: 'login',
  //       },
  //     ],
  //   },
  //   {
  //     path: 'private-area',
  //     canActivateChild: [authGuard],
  //     loadComponent: () => import('@layouts/private-area/private-area'),
  //     children: [
  //       {
  //         path: 'dashboard',
  //         loadComponent: () => import('@features/dashboard/dashboard-page/dashboard-page'),
  //         title: 'Dashboard',
  //       },
  //       {
  //         path: '**',
  //         redirectTo: 'dashboard',
  //       },
  //     ],
  //   },
  { path: '**', redirectTo: '' },
];
