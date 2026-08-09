import { ApplicationConfig, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { loggingInterceptor } from './core/interceptors/loggin.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { countryInterceptor } from './core/interceptors/country.interceptor';
import { PipeService } from './features/curso-fernando-h/services/pipe.service';

import localEs from '@angular/common/locales/es';
import localFr from '@angular/common/locales/fr';
import localEn from '@angular/common/locales/en';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';

registerLocaleData(localEs);
registerLocaleData(localFr);
registerLocaleData(localEn);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([loggingInterceptor, authInterceptor, countryInterceptor])),
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
      }),
    ),
    // HashStrategy
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: LOCALE_ID,
      // useValue: 'es',
      deps: [PipeService],
      useFactory: (pipeService: PipeService) => pipeService.getLocale,
    },
  ],
};
