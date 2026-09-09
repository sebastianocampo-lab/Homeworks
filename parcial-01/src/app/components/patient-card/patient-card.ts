import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-patient-card',
  imports: [],
  templateUrl: './patient-card.html',
  styleUrl: './patient-card.css'
})
export class PatientCard {
  @Input() paciente!: Paciente;
  @Output() onAtender = new EventEmitter<string>();

  atender() {
    this.onAtender.emit(this.paciente.id);
  }
}