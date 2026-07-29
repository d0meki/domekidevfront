import { Routes } from '@angular/router';
import authRoutes from './features/auth/auth.routes';
import { NotAuthenticatedGuard } from './core/guards/not-authenticated.guard';
import dashboardRoutes from './features/dashboard/dashboard.routes';
import cursoFernandoHRoutes from './features/curso-fernando-h/curso-fernando-h.routes';

export const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   children: routesDashboard,
  //   canMatch: [IsAuthenticatedGuard],
  //   // loadComponent: () => import('./layouts/dashboard/dashboard').then((m) => m.Dashboard),
  // },
  {
    path: 'auth',
    children: authRoutes,
    canMatch: [NotAuthenticatedGuard],
  },
  {
    path: 'dashboard',
    children: dashboardRoutes,
  },
  {
     path: 'bases',
    children: cursoFernandoHRoutes,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
