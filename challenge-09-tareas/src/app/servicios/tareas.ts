import { Injectable, computed, inject } from '@angular/core';
import { usarFirestore } from '../hooks/usar-firestore';
import { Sesion } from './sesion';

export interface Tarea {
  id?: string;
  titulo: string;
  hecha: boolean;
  uid: string;
}

// servicio que maneja los datos de las tareas entre las paginas
@Injectable({ providedIn: 'root' })
export class Tareas {
  private coleccion = usarFirestore<Tarea>('tareas');
  private sesion = inject(Sesion);

  lista = this.coleccion.datos;
  cargando = this.coleccion.cargando;
  error = this.coleccion.error;

  pendientes = computed(() => this.lista().filter((tarea) => !tarea.hecha).length);

  async cargar(): Promise<void> {
    const uid = this.sesion.usuario()?.uid;
    if (!uid) {
      return;
    }
    // cada quien ve solo sus tareas
    await this.coleccion.traerTodo([['uid', '==', uid]]);
  }

  async crear(titulo: string): Promise<void> {
    const uid = this.sesion.usuario()?.uid;
    if (!uid || !titulo.trim()) {
      return;
    }
    await this.coleccion.agregar({ titulo: titulo.trim(), hecha: false, uid });
    await this.cargar();
  }

  async renombrar(id: string, titulo: string): Promise<void> {
    if (!titulo.trim()) {
      return;
    }
    await this.coleccion.actualizar(id, { titulo: titulo.trim() });
    await this.cargar();
  }

  async alternar(tarea: Tarea): Promise<void> {
    await this.coleccion.actualizar(tarea.id!, { hecha: !tarea.hecha });
    await this.cargar();
  }

  async borrar(id: string): Promise<void> {
    await this.coleccion.eliminar(id);
    await this.cargar();
  }

  limpiar(): void {
    this.lista.set([]);
  }
}
