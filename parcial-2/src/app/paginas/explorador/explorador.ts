import { Component, OnInit, inject, signal } from '@angular/core';
import { NodoArbol, PeticionCrear } from '../../componentes/nodo-arbol/nodo-arbol';
import { Nodo, armarArbol, dfs } from '../../estructuras/arbol-nario';
import { NodoArchivo } from '../../modelos/nodo-archivo';
import { FirestoreService } from '../../servicios/firestore';
import { Sesion } from '../../servicios/sesion';

@Component({
  selector: 'app-explorador',
  imports: [NodoArbol],
  providers: [FirestoreService],
  templateUrl: './explorador.html',
})
export class ExploradorPagina implements OnInit {
  sesion = inject(Sesion);
  nodos = inject<FirestoreService<NodoArchivo>>(FirestoreService).init('nodos');

  raiz = signal<Nodo>(new Nodo({ nombre: 'Mi unidad', tipo: 'carpeta', padreId: null, correo: '' }));
  aviso = signal('');

  async ngOnInit(): Promise<void> {
    await this.cargar();
  }

  async cargar(): Promise<void> {
    const documentos = await this.nodos.getAll();

    const raiz = new Nodo({ nombre: 'Mi unidad', tipo: 'carpeta', padreId: null, correo: '' });
    for (let hijo of armarArbol(documentos)) {
      raiz.agregarHijo(hijo);
    }

    this.raiz.set(raiz);
    dfs(raiz);
  }

  async alCrear(peticion: PeticionCrear): Promise<void> {
    // sin usuario registrado no se puede crear nada
    if (!this.sesion.estaLogueado()) {
      this.aviso.set('Debes iniciar sesion para crear carpetas o archivos');
      return;
    }

    if (!peticion.padre.esCarpeta()) {
      this.aviso.set('Un archivo no puede contener elementos adentro');
      return;
    }

    if (!peticion.nombre.trim()) {
      return;
    }

    this.aviso.set('');
    await this.nodos.add({
      nombre: peticion.nombre.trim(),
      tipo: peticion.tipo,
      padreId: peticion.padre.valor.id ?? null,
      correo: this.sesion.usuario()!,
    });

    await this.cargar();
  }

  async alEliminar(nodo: Nodo): Promise<void> {
    if (!this.sesion.estaLogueado()) {
      return;
    }

    await this.borrarRama(nodo);
    await this.cargar();
  }

  private async borrarRama(nodo: Nodo): Promise<void> {
    for (let hijo of nodo.hijos) {
      await this.borrarRama(hijo);
    }
    await this.nodos.remove(nodo.valor.id!);
  }
}