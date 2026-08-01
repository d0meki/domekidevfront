import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { loggingInterceptor } from './core/interceptors/loggin.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { countryInterceptor } from './core/interceptors/country.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([loggingInterceptor, authInterceptor,countryInterceptor])),
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
      }),
    ),
    // {
    //   provide: LOCALE_ID,
    //   // useValue: 'es',
    //   deps: [PipeService],
    //   useFactory: (pipeService: PipeService) => pipeService.getLocale,
    // },
  ],
};
