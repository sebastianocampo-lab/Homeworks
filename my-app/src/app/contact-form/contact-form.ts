import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  imports: [],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactFormComponent {
  nombre = '';
  telefono = '';

  @Output() alAgregar = new EventEmitter<{ nombre: string; telefono: string }>();

  capturarNombre(e: any) {
    this.nombre = e.target.value;
  }

  capturarTelefono(e: any) {
    this.telefono = e.target.value;
  }

  agregar() {
    if (this.nombre && this.telefono) {
      this.alAgregar.emit({ nombre: this.nombre, telefono: this.telefono });
      this.nombre = '';
      this.telefono = '';
    }
  }
}