import { Component, inject } from '@angular/core';
import { MusicaService } from '../../services/musica.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.html',
})
export class Ranking {
  musica = inject(MusicaService);
}