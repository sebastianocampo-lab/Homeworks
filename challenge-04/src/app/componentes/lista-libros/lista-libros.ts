import { Component, Input } from '@angular/core';
import { Libro } from '../../modelos/libro';

@Component({
  selector: 'app-lista-libros',
  imports: [],
  templateUrl: './lista-libros.html',
})
export class ListaLibros {
  @Input() libros: Libro[] = [];
}
