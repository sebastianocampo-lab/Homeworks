import { Component } from '@angular/core';
import { Turnos } from './pages/turnos/turnos';

@Component({
  selector: 'app-root',
  imports: [Turnos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'practica-03';
}