export class Nodo {
  valor: number;
  izquierda: Nodo | null = null;
  derecha: Nodo | null = null;

  constructor(valor: number) {
    this.valor = valor;
  }

  isLeaf(): boolean {
    if (this.izquierda === null && this.derecha === null) {
      return true;
    } else {
      return false;
    }
  }
}

export class ArbolBinario {
  raiz: Nodo | null = null;

  insertar(valor: number): boolean {
    const nuevoNodo = new Nodo(valor);
    if (!this.raiz) {
      this.raiz = nuevoNodo;
      return true;
    }

    let actual = this.raiz;
    while (true) {
      // no se dejan meter valores repetidos
      if (valor === actual.valor) {
        return false;
      }

      if (valor < actual.valor) {
        if (!actual.izquierda) {
          actual.izquierda = nuevoNodo;
          return true;
        }
        actual = actual.izquierda;
      } else {
        if (!actual.derecha) {
          actual.derecha = nuevoNodo;
          return true;
        }
        actual = actual.derecha;
      }
    }
  }

  preorden(nodo: Nodo | null, recorrido: number[] = []): number[] {
    if (!nodo) return recorrido;
    console.log(nodo.valor);
    recorrido.push(nodo.valor);
    this.preorden(nodo.izquierda, recorrido);
    this.preorden(nodo.derecha, recorrido);
    return recorrido;
  }

  inorden(nodo: Nodo | null, recorrido: number[] = []): number[] {
    if (!nodo) return recorrido;
    this.inorden(nodo.izquierda, recorrido);
    console.log(nodo.valor);
    recorrido.push(nodo.valor);
    this.inorden(nodo.derecha, recorrido);
    return recorrido;
  }

  postorden(nodo: Nodo | null, recorrido: number[] = []): number[] {
    if (!nodo) return recorrido;
    this.postorden(nodo.izquierda, recorrido);
    this.postorden(nodo.derecha, recorrido);
    console.log(nodo.valor);
    recorrido.push(nodo.valor);
    return recorrido;
  }

  existe(valor: number): boolean {
    let actual = this.raiz;
    while (actual) {
      if (valor === actual.valor) {
        return true;
      }
      actual = valor < actual.valor ? actual.izquierda : actual.derecha;
    }
    return false;
  }
}
