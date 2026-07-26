import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@app/features/auth/services/auth.service';
import { environment } from '@environments/environment';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const token = inject(AuthService).token();
  // Solo agregamos el token si la petición va a nuestra propia API
  if (token && req.url.startsWith(environment.tesloApiUrl)) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
    return next(newReq);
  }

  return next(req);
}

