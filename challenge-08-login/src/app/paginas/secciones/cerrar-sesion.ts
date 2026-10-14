import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../servicios/auth';

@Component({
  selector: 'app-cerrar-sesion',
  template: `
    <h2>Cerrar sesion</h2>
    <p>Se va a terminar la sesion de {{ auth.usuario() }}.</p>
    <button type="button" (click)="salir()">Confirmar</button>
  `,
})
export class CerrarSesion {
  auth = inject(Auth);

  private router = inject(Router);

  salir(): void {
    this.auth.salir();
    this.router.navigate(['/login']);
  }
}
