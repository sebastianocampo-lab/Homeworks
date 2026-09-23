import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Queue } from '../../estructuras/queue';
import { Persona } from '../../modelos/persona';
import { personasIniciales, horaDespuesDe } from '../../datos/personas-iniciales';
import { FormularioPersona, DatosPersona } from '../../componentes/formulario-persona/formulario-persona';
import { ListaFila } from '../../componentes/lista-fila/lista-fila';

@Component({
  selector: 'app-pagina-cajero',
  imports: [FormularioPersona, ListaFila, DatePipe],
  templateUrl: './pagina-cajero.html',
})
export class PaginaCajero {
  private cola = new Queue<Persona>();

  personas: Persona[] = [];
  atendidos: Persona[] = [];
  mensaje = '';

  constructor() {
    personasIniciales()
      .sort((a, b) => a.horaLlegada.getTime() - b.horaLlegada.getTime())
      .forEach((persona) => this.cola.enqueue(persona));
    this.actualizarFila();
  }

  private actualizarFila(): void {
    this.personas = this.cola.getItems();
  }

  agregarPersona(datos: DatosPersona): void {
    const ultima = this.personas.length > 0 ? this.personas[this.personas.length - 1].horaLlegada : null;

    const persona: Persona = {
      id: Date.now(),
      nombre: datos.nombre,
      monto: datos.monto,
      horaLlegada: horaDespuesDe(ultima),
    };

    this.cola.enqueue(persona);
    this.actualizarFila();
    this.mensaje = `enqueue(): ${persona.nombre} entro a la fila a las ${persona.horaLlegada.toLocaleTimeString('es-CO')}`;
  }

  atenderPersona(): void {
    const atendida = this.cola.dequeue();
    this.actualizarFila();

    if (atendida) {
      this.atendidos = [...this.atendidos, atendida];
      this.mensaje = `dequeue(): se atendio a ${atendida.nombre} y salio de la fila`;
    } else {
      this.mensaje = 'dequeue(): la fila esta vacia, devolvio null';
    }
  }

  verSiguiente(): void {
    const siguiente = this.cola.peek();
    this.mensaje = siguiente
      ? `peek(): el siguiente es ${siguiente.nombre} y sigue en la fila`
      : 'peek(): la fila esta vacia, devolvio null';
  }

  imprimirEnConsola(): void {
    this.cola.print();
    this.mensaje = 'print(): mira la consola del navegador';
  }

  get cantidad(): number {
    return this.cola.size();
  }

  get vacia(): boolean {
    return this.cola.isEmpty();
  }
}
