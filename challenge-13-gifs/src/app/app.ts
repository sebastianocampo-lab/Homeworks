import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GifsService } from './services/gifs.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  titulo = 'Challenge 13 - Buscador de Gifs';

  texto = signal('');

  srv = inject(GifsService);

  buscar(): void {
    if (!this.texto().trim()) {
      return;
    }
    this.srv.buscar(this.texto().trim());
  }
}
