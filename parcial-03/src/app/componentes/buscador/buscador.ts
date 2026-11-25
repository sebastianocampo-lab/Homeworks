import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicaService } from '../../services/musica.service';
import { Cancion } from '../../modelos/cancion';

@Component({
  selector: 'app-buscador',
  imports: [FormsModule],
  templateUrl: './buscador.html',
})
export class Buscador {
  musica = inject(MusicaService);

  texto = '';
  resultados = signal<Cancion[]>([]);
  mensaje = signal('');

  buscar(valor: string) {
    this.texto = valor;
    this.mensaje.set('');
    this.resultados.set(valor.trim() ? this.musica.sugerencias(valor) : []);
  }

  comprobar() {
    const titulo = this.texto.trim();
    if (!titulo) return;

    if (this.musica.existe(titulo)) {
      this.mensaje.set(`"${titulo}" si esta en la plataforma`);
    } else {
      this.mensaje.set(`"${titulo}" no esta en la plataforma`);
    }
  }

  ver(cancion: Cancion) {
    this.musica.seleccionada.set(cancion.titulo);
  }

  reproducir(cancion: Cancion) {
    this.musica.reproducir(cancion);
  }
}