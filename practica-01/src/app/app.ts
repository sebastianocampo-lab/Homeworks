import { Component } from '@angular/core';
import { Registro } from './pages/registro/registro';

@Component({
  selector: 'app-root',
  imports: [Registro],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'practica-01';
}