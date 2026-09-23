import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../modelos/libro';

@Component({
  selector: 'app-formulario-libro',
  imports: [FormsModule],
  templateUrl: './formulario-libro.html',
})
export class FormularioLibro {
  @Output() libroCreado = new EventEmitter<Libro>();

  nuevoLibro = { nombre: '', isbn: '', autor: '', editorial: '' };
  error = '';

  guardar(): void {
    const { nombre, isbn, autor, editorial } = this.nuevoLibro;

    if (!nombre || !isbn || !autor || !editorial) {
      this.error = 'Faltan campos por llenar';
      return;
    }

    this.libroCreado.emit({ id: Date.now(), nombre, isbn, autor, editorial });

    this.nuevoLibro = { nombre: '', isbn: '', autor: '', editorial: '' };
    this.error = '';
  }
}
