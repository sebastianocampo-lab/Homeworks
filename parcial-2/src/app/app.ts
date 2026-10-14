import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Sesion } from './servicios/sesion';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  titulo = 'Parcial 2 - Estructuras de Datos 2';
  subtitulo = 'Sebastian Ocampo - 2240055';

  sesion = inject(Sesion);

  private router = inject(Router);

  async salir(): Promise<void> {
    await this.sesion.salir();
    this.router.navigate(['/login']);
  }
}