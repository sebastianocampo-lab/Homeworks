import { Component, Input } from '@angular/core';
import { Medico } from '../../models/medico';

@Component({
  selector: 'app-medicos',
  imports: [],
  templateUrl: './medicos.html',
  styleUrl: './medicos.css'
})
export class Medicos {
  @Input() medico: Medico | null = null;
}