import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from './servicios/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  titulo = 'Estructuras de Datos II';
  subtitulo = 'Challenge 08 - Login y rutas privadas';

  auth = inject(Auth);

  private router = inject(Router);

  salir(): void {
    this.auth.salir();
    this.router.navigate(['/login']);
  }
}
