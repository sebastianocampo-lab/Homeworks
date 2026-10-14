import { signal } from '@angular/core';
import {
  DocumentData,
  WhereFilterOp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/config';

// ejemplo de filtro: ['uid', '==', 'abc123']
export type Filtro = [string, WhereFilterOp, any];

// hook con el CRUD basico, sirve para cualquier coleccion
export function usarFirestore<T extends { id?: string }>(nombreColeccion: string) {
  const datos = signal<T[]>([]);
  const cargando = signal(false);
  const error = signal('');

  async function traerTodo(filtros: Filtro[] = []): Promise<T[]> {
    cargando.set(true);
    error.set('');

    try {
      let consulta = query(collection(db, nombreColeccion));
      for (const [campo, operador, valor] of filtros) {
        consulta = query(consulta, where(campo, operador, valor));
      }

      const respuesta = await getDocs(consulta);
      const documentos = respuesta.docs.map((d) => ({ id: d.id, ...d.data() })) as T[];

      datos.set(documentos);
      return documentos;
    } catch (e: any) {
      error.set(e.message ?? 'No se pudieron cargar los datos');
      return [];
    } finally {
      cargando.set(false);
    }
  }

  async function agregar(nuevo: Omit<T, 'id'>): Promise<void> {
    error.set('');
    try {
      await addDoc(collection(db, nombreColeccion), { ...nuevo, creadoEn: serverTimestamp() });
    } catch (e: any) {
      error.set(e.message ?? 'No se pudo guardar');
    }
  }

  async function actualizar(id: string, cambios: Partial<T>): Promise<void> {
    error.set('');
    try {
      // el cast es porque firestore espera un objeto suelto, no un Partial<T>
      await updateDoc(doc(db, nombreColeccion, id), cambios as DocumentData);
    } catch (e: any) {
      error.set(e.message ?? 'No se pudo actualizar');
    }
  }

  async function eliminar(id: string): Promise<void> {
    error.set('');
    try {
      await deleteDoc(doc(db, nombreColeccion, id));
    } catch (e: any) {
      error.set(e.message ?? 'No se pudo eliminar');
    }
  }

  return { datos, cargando, error, traerTodo, agregar, actualizar, eliminar };
}
