import { Component } from '@angular/core';
import { Carrusel } from './pages/carrusel/carrusel';

@Component({
  selector: 'app-root',
  imports: [Carrusel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'practica-02';
}