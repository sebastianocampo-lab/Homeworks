import { Routes } from '@angular/router';
import { ItemMenu } from '../modelos/item-menu';

export class Nodo {
  valor: ItemMenu;
  hijos: Nodo[] = [];

  constructor(valor: ItemMenu) {
    this.valor = valor;
  }

  agregarHijo(nodo: Nodo): void {
    this.hijos.push(nodo);
  }
}

// para pintar el recorrido en pantalla necesito el nivel de cada item
export interface Paso {
  titulo: string;
  nivel: number;
}

export function recorrerDfs(nodo: Nodo, nivel = 0, pasos: Paso[] = []): Paso[] {
  pasos.push({ titulo: nodo.valor.titulo, nivel });
  for (let hijo of nodo.hijos) {
    recorrerDfs(hijo, nivel + 1, pasos);
  }
  return pasos;
}

export function recorrerBfs(raiz: Nodo): Paso[] {
  const pasos: Paso[] = [];
  const cola: { nodo: Nodo; nivel: number }[] = [{ nodo: raiz, nivel: 0 }];

  while (cola.length > 0) {
    const actual = cola.shift()!;
    pasos.push({ titulo: actual.nodo.valor.titulo, nivel: actual.nivel });
    for (let hijo of actual.nodo.hijos) {
      cola.push({ nodo: hijo, nivel: actual.nivel + 1 });
    }
  }
  return pasos;
}

export function dfs(nodo: Nodo, nivel = 0): void {
  console.log('  '.repeat(nivel) + nodo.valor.titulo);
  for (let hijo of nodo.hijos) {
    dfs(hijo, nivel + 1);
  }
}

export function bfs(raiz: Nodo): void {
  const cola = [raiz];
  while (cola.length > 0) {
    const actual = cola.shift()!;
    console.log(actual.valor.titulo);
    cola.push(...actual.hijos);
  }
}

// busca por titulo sin importar mayusculas, devuelve el nodo o null
export function buscar(nodo: Nodo, titulo: string): Nodo | null {
  if (nodo.valor.titulo.toLowerCase() === titulo.toLowerCase()) {
    return nodo;
  }
  for (let hijo of nodo.hijos) {
    const encontrado = buscar(hijo, titulo);
    if (encontrado) {
      return encontrado;
    }
  }
  return null;
}

// recorre el arbol y saca una ruta por cada item que tenga componente
export function sacarRutas(nodo: Nodo, rutas: Routes = []): Routes {
  if (nodo.valor.componente) {
    rutas.push({
      path: nodo.valor.link,
      component: nodo.valor.componente,
      title: nodo.valor.titulo,
    });
  }
  for (let hijo of nodo.hijos) {
    sacarRutas(hijo, rutas);
  }
  return rutas;
}
