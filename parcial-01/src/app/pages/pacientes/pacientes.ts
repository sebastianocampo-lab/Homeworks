import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Paciente } from '../../models/paciente';
import { PatientCard } from '../../components/patient-card/patient-card';

@Component({
  selector: 'app-pacientes',
  imports: [PatientCard],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css'
})
export class Pacientes {
  @Input() pacientes: Paciente[] = [];
  @Output() onAtender = new EventEmitter<string>();

  atender(id: string) {
    this.onAtender.emit(id);
  }
}

