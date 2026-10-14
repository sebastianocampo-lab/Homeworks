import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Sesion } from './servicios/sesion';
import { Tareas } from './servicios/tareas';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  titulo = 'Estructuras de Datos II';
  subtitulo = 'Challenge 09 - Firebase y tareas';

  sesion = inject(Sesion);

  private tareas = inject(Tareas);
  private router = inject(Router);

  async salir(): Promise<void> {
    await this.sesion.salir();
    // si no se limpia, el siguiente usuario alcanza a ver las tareas del anterior
    this.tareas.limpiar();
    this.router.navigate(['/login']);
  }
}
