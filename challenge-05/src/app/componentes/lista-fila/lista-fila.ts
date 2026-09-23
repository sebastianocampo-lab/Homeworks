import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Persona } from '../../modelos/persona';

@Component({
  selector: 'app-lista-fila',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './lista-fila.html',
})
export class ListaFila {
  private fila: Persona[] = [];

  @Input() set personas(valor: Persona[]) {
    this.fila = valor;
    this.personasOrdenadas = [...valor].sort(
      (a, b) => a.horaLlegada.getTime() - b.horaLlegada.getTime(),
    );
  }

  get personas(): Persona[] {
    return this.fila;
  }

  personasOrdenadas: Persona[] = [];
}
