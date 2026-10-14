import { NodoArchivo } from '../modelos/nodo-archivo';

export class Nodo {
  valor: NodoArchivo;
  hijos: Nodo[] = [];

  constructor(valor: NodoArchivo) {
    this.valor = valor;
  }

  esCarpeta(): boolean {
    return this.valor.tipo === 'carpeta';
  }

  agregarHijo(nodo: Nodo): void {
    if (!this.esCarpeta()) {
      return;
    }
    this.hijos.push(nodo);
  }
}

// DFS: baja hasta el fondo de una rama antes de pasar a la siguiente
export function dfs(nodo: Nodo, nivel = 0): void {
  console.log('  '.repeat(nivel) + (nodo.esCarpeta() ? '[+] ' : '    ') + nodo.valor.nombre);
  for (let hijo of nodo.hijos) {
    dfs(hijo, nivel + 1);
  }
}

// BFS: recorre nivel por nivel usando una cola
export function bfs(raiz: Nodo): void {
  const cola = [raiz];
  while (cola.length > 0) {
    const actual = cola.shift()!;
    console.log(actual.valor.nombre);
    cola.push(...actual.hijos);
  }
}

// firestore devuelve los documentos sueltos, aca se vuelven a conectar por el padreId
export function armarArbol(documentos: NodoArchivo[], padreId: string | null = null): Nodo[] {
  const nodos: Nodo[] = [];

  for (let documento of documentos) {
    if (documento.padreId === padreId) {
      const nodo = new Nodo(documento);
      for (let hijo of armarArbol(documentos, documento.id!)) {
        nodo.agregarHijo(hijo);
      }
      nodos.push(nodo);
    }
  }

  return nodos;
}