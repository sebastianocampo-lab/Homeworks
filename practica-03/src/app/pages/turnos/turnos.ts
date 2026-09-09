import { Component, signal } from '@angular/core';
import { CircularLinkedList, Node } from '../../models/linked-list';
import { TurnDisplay } from '../../components/turn-display/turn-display';

@Component({
  selector: 'app-turnos',
  imports: [TurnDisplay],
  templateUrl: './turnos.html',
  styleUrl: './turnos.css'
})
export class Turnos {
  listaTurnos = new CircularLinkedList();
  turnoActual = signal<Node | null>(null);
  mensaje = signal<string>('Sistema iniciado');
  nuevoTurno = signal<string>('');
  contador = signal<number>(1);

  constructor() {
    this.listaTurnos.append('A001');
    this.listaTurnos.append('A002');
    this.listaTurnos.append('A003');
    this.contador.set(4);

    this.turnoActual.set(this.listaTurnos.head);
    this.mensaje.set('Atendiendo: ' + this.listaTurnos.head?.value);
  }

  agregarTurno() {
    let codigo = this.nuevoTurno().trim();

    if (!codigo) {
      codigo = 'A' + String(this.contador()).padStart(3, '0');
      this.contador.update(n => n + 1);
    }

    this.listaTurnos.append(codigo);

    if (!this.turnoActual()) {
      this.turnoActual.set(this.listaTurnos.head);
      this.mensaje.set('Atendiendo: ' + codigo);
    } else {
      this.mensaje.set('Turno ' + codigo + ' agregado a la fila');
    }

    this.nuevoTurno.set('');
  }

  siguienteTurno() {
    const actual = this.turnoActual();
    if (!actual) return;

    this.turnoActual.set(actual.next);
    this.mensaje.set('Ahora atendiendo: ' + actual.next?.value);
  }
}