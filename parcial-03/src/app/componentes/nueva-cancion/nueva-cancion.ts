import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicaService } from '../../services/musica.service';

@Component({
  selector: 'app-nueva-cancion',
  imports: [FormsModule],
  templateUrl: './nueva-cancion.html',
})
export class NuevaCancion {
  musica = inject(MusicaService);

  titulo = '';
  artista = '';
  relacionada = '';
  mensaje = signal('');

  guardar() {
    if (!this.titulo.trim() || !this.artista.trim()) {
      this.mensaje.set('Escribe el titulo y el artista');
      return;
    }

    const error = this.musica.agregar(this.titulo.trim(), this.artista.trim(), this.relacionada);

    if (error) {
      this.mensaje.set(error);
      return;
    }

    this.mensaje.set(`Se agrego "${this.titulo.trim()}"`);
    this.titulo = '';
    this.artista = '';
    this.relacionada = '';
  }
}