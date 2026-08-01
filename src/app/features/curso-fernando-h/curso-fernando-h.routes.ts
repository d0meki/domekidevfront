import { Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '@app/core/guards/is-authenticate.guard';
import { AdminLayout } from '@app/layout/components/admin-layout/admin-layout';

export const cursoFernandoHRoutes: Routes = [
  {
    path: '',
    component: AdminLayout,
    canMatch: [IsAuthenticatedGuard],
    children: [
      {
        path: 'counter',
        loadComponent: () => import('./pages/bases/bases'),
        // title: 'Analytics | Dashboard',
      },
      {
        path: 'gifs/:query',
        loadComponent: () => import('./pages/gifs/list-gifs-page/list-gifs-page'),
        // title: 'Analytics | Dashboard',
      },
      {
        path: 'capital',
        loadComponent: () => import('./pages/country/pages/by-capital-page/by-capital-page'),
      },
      {
        path: 'pais',
        loadComponent: () => import('./pages/country/pages/by-country-page/by-country-page'),
      },
      {
        path: 'region',
        loadComponent: () => import('./pages/country/pages/by-region-page/by-region-page'),
      },
      {
        path: 'by:code',
        loadComponent: () => import('./pages/country/pages/country-page/country-page'),
      },
      {
        path: '',
        redirectTo: 'counter',
        pathMatch: 'full',
      },
    ],
  },
];

export default cursoFernandoHRoutes;
