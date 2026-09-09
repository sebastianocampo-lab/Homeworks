import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Estudiante } from '../../models/estudiante';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentList {
  
  @Input() estudiantes: Estudiante[] = [];

  @Output() onDelete = new EventEmitter<string>();

  eliminar(codigo: string) {
    this.onDelete.emit(codigo);
  }
}