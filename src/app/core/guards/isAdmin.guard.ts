import { inject } from '@angular/core';
import type { CanActivateFn, CanMatchFn } from '@angular/router';
import { AuthService } from '@app/features/auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const isAdminGuard: CanMatchFn  = async (route, state) =>   {
  const authService = inject(AuthService);

  await firstValueFrom(authService.checkStatus());

  return authService.isAdmin();
};
