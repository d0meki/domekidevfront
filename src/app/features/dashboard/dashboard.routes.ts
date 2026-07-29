import { Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '@app/core/guards/is-authenticate.guard';
import { AdminLayout } from '@app/layout/components/admin-layout/admin-layout';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: AdminLayout,
    canMatch: [IsAuthenticatedGuard],
    children: [
      {
        path: 'analytics',
        // loadComponent: () =>
        //   import('./pages/analytics/analytics-page').then((module) => module.AnalyticsPage),
        loadComponent: () => import('./pages/analytics/analytics-page'),
        title: 'Analytics | Dashboard',
      },
      {
        path: '',
        redirectTo: 'analytics',
        pathMatch: 'full',
      },
    ],
  },
];

export default dashboardRoutes;
