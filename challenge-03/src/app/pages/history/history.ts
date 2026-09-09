import { Component, signal } from '@angular/core';
import { DoubleLinkedList, DoubleNode } from '../../models/linked-list';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History {
  historial = new DoubleLinkedList();
  paginaActual = signal<DoubleNode | null>(null);
  paginas = signal<string[]>([]);

  constructor() {
    this.historial.append('google.com');
    this.historial.append('youtube.com');
    this.historial.append('github.com');
    this.historial.append('angular.dev');
    this.historial.append('icesi.edu.co');

    this.paginaActual.set(this.historial.head);
    this.paginas.set(this.toArray());
  }

  toArray(): string[] {
    const result: string[] = [];
    let current = this.historial.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  atras() {
    const actual = this.paginaActual();
    if (actual && actual.prev) {
      this.paginaActual.set(actual.prev);
    }
  }

  adelante() {
    const actual = this.paginaActual();
    if (actual && actual.next) {
      this.paginaActual.set(actual.next);
    }
  }

  puedeIrAtras(): boolean {
    const actual = this.paginaActual();
    return actual !== null && actual.prev !== null;
  }

  // Verificar si se puede ir adelante
  puedeIrAdelante(): boolean {
    const actual = this.paginaActual();
    return actual !== null && actual.next !== null;
  }
}