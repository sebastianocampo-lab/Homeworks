import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Nodo } from '../../estructuras/arbol-nario';
import { TipoNodo } from '../../modelos/nodo-archivo';

export interface PeticionCrear {
  padre: Nodo;
  nombre: string;
  tipo: TipoNodo;
}

// este componente se llama a si mismo para pintar cada rama del arbol
@Component({
  selector: 'app-nodo-arbol',
  imports: [FormsModule],
  templateUrl: './nodo-arbol.html',
})
export class NodoArbol {
  @Input() nodo!: Nodo;
  @Input() nivel = 0;

  @Output() crear = new EventEmitter<PeticionCrear>();
  @Output() eliminar = new EventEmitter<Nodo>();

  abierto = true;

  // guarda el tipo que se esta creando, null cuando el formulario esta cerrado
  creando = signal<TipoNodo | null>(null);
  nombreNuevo = signal('');

  alternar(): void {
    if (this.nodo.esCarpeta()) {
      this.abierto = !this.abierto;
    }
  }

  abrirFormulario(tipo: TipoNodo): void {
    this.creando.set(tipo);
    this.nombreNuevo.set('');
    this.abierto = true;
  }

  confirmarCreacion(): void {
    this.crear.emit({ padre: this.nodo, nombre: this.nombreNuevo(), tipo: this.creando()! });
    this.creando.set(null);
  }

  cancelar(): void {
    this.creando.set(null);
  }
}