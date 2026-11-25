import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicaService } from '../../services/musica.service';

@Component({
  selector: 'app-relacionadas',
  imports: [FormsModule],
  templateUrl: './relacionadas.html',
})
export class Relacionadas {
  musica = inject(MusicaService);

  elegir(titulo: string) {
    this.musica.seleccionada.set(titulo);
  }
}