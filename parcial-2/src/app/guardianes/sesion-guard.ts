import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Sesion } from '../servicios/sesion';

export const sesionGuard: CanActivateFn = () => {
  const sesion = inject(Sesion);
  const router = inject(Router);

  return sesion.estaLogueado() ? true : router.createUrlTree(['/login']);
};