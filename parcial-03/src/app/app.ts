import { Component } from '@angular/core';
import { Buscador } from './componentes/buscador/buscador';
import { Ranking } from './componentes/ranking/ranking';
import { Relacionadas } from './componentes/relacionadas/relacionadas';
import { NuevaCancion } from './componentes/nueva-cancion/nueva-cancion';

@Component({
  selector: 'app-root',
  imports: [Buscador, Ranking, Relacionadas, NuevaCancion],
  templateUrl: './app.html',
})
export class App {}