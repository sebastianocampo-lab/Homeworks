import { Component } from '@angular/core';
import { Stack } from '../../estructuras/stack';
import { Libro } from '../../modelos/libro';
import { LIBROS_INICIALES } from '../../datos/libros-iniciales';
import { FormularioLibro } from '../../componentes/formulario-libro/formulario-libro';
import { ListaLibros } from '../../componentes/lista-libros/lista-libros';

@Component({
  selector: 'app-pagina-libros',
  imports: [FormularioLibro, ListaLibros],
  templateUrl: './pagina-libros.html',
})
export class PaginaLibros {
  private pila = new Stack<Libro>();

  libros: Libro[] = [];
  mensaje = '';

  constructor() {
    LIBROS_INICIALES.forEach((libro) => this.pila.push(libro));
    this.actualizarLista();
  }

  private actualizarLista(): void {
    // se invierte para que el tope quede de primero en pantalla
    this.libros = this.pila.getItems().reverse();
  }

  agregarLibro(libro: Libro): void {
    this.pila.push(libro);
    this.actualizarLista();
    this.mensaje = `push(): "${libro.nombre}" quedo en el tope`;
  }

  sacarLibro(): void {
    const sacado = this.pila.pop();
    this.actualizarLista();
    this.mensaje = sacado
      ? `pop(): se saco "${sacado.nombre}" de la pila`
      : 'pop(): la pila esta vacia, devolvio null';
  }

  verTope(): void {
    const tope = this.pila.peek();
    this.mensaje = tope
      ? `peek(): en el tope esta "${tope.nombre}" y sigue en la pila`
      : 'peek(): la pila esta vacia, devolvio null';
  }

  imprimirEnConsola(): void {
    this.pila.print();
    this.mensaje = 'print(): mira la consola del navegador';
  }

  get cantidad(): number {
    return this.pila.size();
  }

  get vacia(): boolean {
    return this.pila.isEmpty();
  }
}
