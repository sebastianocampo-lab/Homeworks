import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuLateral } from './componentes/menu-lateral/menu-lateral';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuLateral],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  titulo = 'Estructuras de Datos II';
  subtitulo = 'Challenge 07 - Arboles N-arios';
}
