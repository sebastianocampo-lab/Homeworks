import { Component, signal } from '@angular/core';
import { LinkedList } from '../../models/linked-list';
import { Estudiante } from '../../models/estudiante';
import { StudentList } from '../../components/student-list/student-list';

@Component({
  selector: 'app-registro',
  imports: [StudentList],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  // La lista enlazada donde guardamos los estudiantes
  listaEstudiantes = new LinkedList();

  // Signals para los campos del formulario
  codigo = signal<string>('');
  nombre = signal<string>('');
  edad = signal<number>(0);

  // Signal con array de estudiantes (para pasar al hijo)
  estudiantes = signal<Estudiante[]>([]);

  // Método auxiliar: convierte la lista enlazada en array
  toArray(): Estudiante[] {
    const result: Estudiante[] = [];
    let current = this.listaEstudiantes.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  // Agregar un estudiante nuevo
  agregarEstudiante() {
    const cod = this.codigo().trim();
    const nom = this.nombre().trim();
    const ed = this.edad();

    // Validaciones básicas
    if (!cod || !nom || ed <= 0) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const nuevo: Estudiante = { codigo: cod, nombre: nom, edad: ed };

    this.listaEstudiantes.append(nuevo);
    this.estudiantes.set(this.toArray());

    // Limpiar el formulario
    this.codigo.set('');
    this.nombre.set('');
    this.edad.set(0);
  }

  // Método que se ejecuta cuando el hijo emite el evento de eliminar
  eliminarEstudiante(codigo: string) {
    // Buscar el estudiante por código (los objetos no se comparan directo)
    const estudiante = this.toArray().find(e => e.codigo === codigo);
    if (estudiante) {
      this.listaEstudiantes.remove(estudiante);
      this.estudiantes.set(this.toArray());
    }
  }
}
