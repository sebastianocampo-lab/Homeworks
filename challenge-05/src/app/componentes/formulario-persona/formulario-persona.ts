import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface DatosPersona {
  nombre: string;
  monto: number;
}

@Component({
  selector: 'app-formulario-persona',
  imports: [FormsModule],
  templateUrl: './formulario-persona.html',
})
export class FormularioPersona {
  @Output() personaCreada = new EventEmitter<DatosPersona>();

  nuevaPersona = { nombre: '', monto: null as number | null };
  error = '';

  guardar(): void {
    const { nombre, monto } = this.nuevaPersona;

    if (!nombre || monto === null) {
      this.error = 'Faltan campos por llenar';
      return;
    }

    if (Number(monto) <= 0) {
      this.error = 'El monto tiene que ser mayor a cero';
      return;
    }

    this.personaCreada.emit({ nombre, monto: Number(monto) });

    this.nuevaPersona = { nombre: '', monto: null };
    this.error = '';
  }
}
