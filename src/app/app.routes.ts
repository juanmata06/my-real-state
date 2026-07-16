import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from '@shared/guards';

export const routes: Routes = [
  {
    path: 'auth',
    canActivateChild: [noAuthGuard],
    loadComponent: () => import('@layouts/auth-area/auth-area'),
    children: [
      {
        path: 'login',
        loadComponent: () => import('@features/auth/pages/login-page/login-page.component'),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () => import('@features/auth/pages/register-page/register-page.component'),
        title: 'Register',
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
  {
    path: 'private-area',
    canActivateChild: [authGuard],
    loadComponent: () => import('@layouts/private-area/private-area'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('@features/dashboard/pages/dashboard-page/dashboard-page'),
        title: 'Dashboard',
      },
       {
        path: 'properties',
        loadComponent: () => import('@features/properties/pages/properties-list/properties-list'),
        title: 'Properties',
      },
      {
        path: 'brokers',
        loadComponent: () => import('@features/brokers/pages/brokers-list/brokers-list'),
        title: 'Brokers',
      },
      {
        path: 'customers',
        loadComponent: () => import('@features/customers/pages/customers-list/customers-list'),
        title: 'Customers',
      },
      {
        path: 'sales',
        loadComponent: () => import('@features/sales/pages/sales-list/sales-list'),
        title: 'Sales',
      },
      {
        path: 'rents',
        loadComponent: () => import('@features/rents/pages/rents-list/rents-list'),
        title: 'Rents',
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '',
    loadComponent: () => import('@layouts/public-area/public-area'),
    children: [
      {
        path: '',
        loadComponent: () => import('@features/landing/pages/landing-page/landing-page'),
      },
      {
        path: 'search',
        loadComponent: () => import('@features/searcher/pages/search-page/search-page'),
      },
      {
        path: 'search/:id',
        loadComponent: () => import('@features/searcher/pages/house-detail-page/house-detail-page'),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  { path: '**', redirectTo: 'auth' },
];
