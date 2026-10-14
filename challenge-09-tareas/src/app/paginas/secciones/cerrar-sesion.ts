import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../servicios/sesion';
import { Tareas } from '../../servicios/tareas';

@Component({
  selector: 'app-cerrar-sesion',
  template: `
    <h2>Cerrar sesion</h2>
    <p>Se va a terminar la sesion de {{ sesion.correo() }}.</p>
    <button class="btn btn-primary" type="button" (click)="salir()">Confirmar</button>
  `,
})
export class CerrarSesion {
  sesion = inject(Sesion);

  private tareas = inject(Tareas);
  private router = inject(Router);

  async salir(): Promise<void> {
    await this.sesion.salir();
    this.tareas.limpiar();
    this.router.navigate(['/login']);
  }
}
