import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Sesion } from '../servicios/sesion';

export const sesionGuard: CanActivateFn = async () => {
  const sesion = inject(Sesion);
  const router = inject(Router);

  // al recargar la pagina firebase se demora un momento en responder
  await sesion.esperarRevision();

  return sesion.estaLogueado() ? true : router.createUrlTree(['/login']);
};
