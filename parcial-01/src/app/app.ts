import { Component, signal } from '@angular/core';
import { LinkedList } from './models/linked-list';
import { Paciente } from './models/paciente';
import { Pacientes } from './pages/pacientes/pacientes';
import { DoubleLinkedList } from './models/linked-list';
import { Atencion } from './models/atencion';
import { Historial } from './pages/historial/historial';
import { CircularLinkedList, CircularNode } from './models/linked-list';
import { Medicos } from './pages/medicos/medicos';
import { CircularDoubleLinkedList, CircularDoubleNode } from './models/linked-list';
import { Comite } from './pages/comite/comite';

@Component({
  selector: 'app-root',
  imports: [Pacientes, Historial, Medicos, Comite],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  listaPacientes = new LinkedList();
  pacientes = signal<Paciente[]>([]);

  listaHistorial = new DoubleLinkedList();
  historial = signal<Atencion[]>([]);

  listaMedicos = new CircularLinkedList();
  medicoActual = signal<CircularNode | null>(null);

  listaComite = new CircularDoubleLinkedList();
  miembroActual = signal<CircularDoubleNode | null>(null);

  id = signal<string>('');
  nombre = signal<string>('');
  motivo = signal<string>('');

  contador = signal<number>(1);
  vista = signal<string>('pacientes');


  // Se implemento este constructor con el fin de hacer las primeras inserciones de datos prueba
  constructor() {
    
    this.listaPacientes.append({ id: 'P001', nombre: 'Ana Torres', motivo: 'Consulta general' });
    this.listaPacientes.append({ id: 'P002', nombre: 'Luis Perez', motivo: 'Dolor de cabeza' });
    this.listaPacientes.append({ id: 'P003', nombre: 'Maria Gomez', motivo: 'Control rutinario' });
    this.contador.set(4);

    this.pacientes.set(this.toArrayPacientes());

    //Aqui se hace la insercion de medicos prueba tal cual como hicimos con los pacientea
    this.listaMedicos.append({ id: 'M1', nombre: 'Dr. Ramirez', especialidad: 'Cardiologia' });
    this.listaMedicos.append({ id: 'M2', nombre: 'Dra. Lopez', especialidad: 'Pediatria' });
    this.listaMedicos.append({ id: 'M3', nombre: 'Dr. Castro', especialidad: 'Neurologia' });

    this.medicoActual.set(this.listaMedicos.head);

    setInterval(() => {
      this.rotarMedico();
    }, 10000);

        // Cargar miembros del comité
    this.listaComite.append({ id: 'C1', nombre: 'Sofia Ruiz', cargo: 'Directora' });
    this.listaComite.append({ id: 'C2', nombre: 'Pedro Diaz', cargo: 'Administrador' });
    this.listaComite.append({ id: 'C3', nombre: 'Laura Vega', cargo: 'Tesorera' });

    // El primer miembro mostrado es el head
    this.miembroActual.set(this.listaComite.head);
  }

  // Convierte la lista simple en array
  toArrayPacientes(): Paciente[] {
    const result: Paciente[] = [];
    let current = this.listaPacientes.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  // Funcion de agregar un nuevo paciente como lo pide el enunciado
  agregarPaciente() {
    let idPaciente = this.id().trim();
    const nom = this.nombre().trim();
    const mot = this.motivo().trim();

    if (!nom || !mot) {
      alert('Nombre y motivo son obligatorios');
      return;
    }

    if (!idPaciente) {
      idPaciente = 'P' + String(this.contador()).padStart(3, '0');
      this.contador.update(n => n + 1);
    }

    const nuevo: Paciente = { id: idPaciente, nombre: nom, motivo: mot };

    this.listaPacientes.append(nuevo);
    this.pacientes.set(this.toArrayPacientes());

    this.id.set('');
    this.nombre.set('');
    this.motivo.set('');
  }

  // Esta funcion es la que podemos encontrar en el boton de atender en la interfaz que abrimos en el navegador
  atenderPaciente(id: string) {
    const paciente = this.toArrayPacientes().find(p => p.id === id);
    if (paciente) {
      // implementamos la funcion remove para borrar un paciente existente dento de la lista
      this.listaPacientes.remove(paciente);
      this.pacientes.set(this.toArrayPacientes());

      this.listaHistorial.append(paciente);
      this.historial.set(this.toArrayHistorial());
    }
  }

  toArrayHistorial(): Atencion[] {
    const result: Atencion[] = [];
    let current = this.listaHistorial.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  rotarMedico() {
    const actual = this.medicoActual();
    if (!actual) return;

    this.medicoActual.set(actual.next);
  }

  siguienteMiembro() {
    const actual = this.miembroActual();
    if (!actual) return;
    this.miembroActual.set(actual.next);
  }

  anteriorMiembro() {
    const actual = this.miembroActual();
    if (!actual) return;
    this.miembroActual.set(actual.prev);
  }

  // Esta funcion cambia entre las pestañas del panel web que se pide
  cambiarVista(v: string) {
    this.vista.set(v);
  }
}