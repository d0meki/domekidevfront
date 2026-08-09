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
        path: 'country',
        loadComponent: () => import('./pages/country/pages/country-index/country-index'),
      },
      {
        path: 'by/:code',
        loadComponent: () => import('./pages/country/pages/country-page/country-page'),
      },
      {
        path: 'pipe-example',
        loadComponent: () => import('./pages/pipes-example/pipes-example'),
      },
       {
        path: 'custom-pipe-example',
        loadComponent: () => import('./pages/custom-page/custom-page'),
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
