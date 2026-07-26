import { Routes } from '@angular/router';
import AuthLayout from './auth.layout';
import LoginPage from './pages/login-page/login-page';
export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        // loadComponent: () => import('./pages/login-page/login-page'), 
        component: LoginPage
      },
      {
        path: 'register',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

export default authRoutes;
