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
