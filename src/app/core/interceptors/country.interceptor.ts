import type { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment';

export const countryInterceptor: HttpInterceptorFn = (req, next) => {
  const token = environment.apikeyCountries;
  // Solo agregamos el token si la petición va a nuestra propia API
  if (token && req.url.startsWith(environment.apiCoutriesUrl)) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
    return next(newReq);
  }

  return next(req);
};
