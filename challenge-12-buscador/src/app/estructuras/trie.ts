export interface Producto {
  nombre: string;
  popularidad: number;
}

export class Nodo {
  valor: string | null;
  esFinDePalabra = false;
  hijos: { [caracter: string]: Nodo } = {};
  // la popularidad solo tiene sentido en el nodo donde termina la palabra
  popularidad = 0;

  constructor(valor: string | null) {
    this.valor = valor;
  }
}

export class Trie {
  raiz = new Nodo(null);

  insertar(palabra: string, popularidad: number): void {
    let actual = this.raiz;

    for (let caracter of palabra) {
      if (actual.hijos[caracter] === undefined) {
        actual.hijos[caracter] = new Nodo(caracter);
      }
      actual = actual.hijos[caracter];
    }

    actual.esFinDePalabra = true;
    actual.popularidad = popularidad;
  }

  buscar(palabra: string): boolean {
    let actual = this.raiz;

    for (let caracter of palabra) {
      if (actual.hijos[caracter] === undefined) {
        return false;
      }
      actual = actual.hijos[caracter];
    }

    return actual.esFinDePalabra;
  }

  // bajo hasta donde termina el prefijo y de ahi recojo todo lo que cuelga
  buscarPorPrefijo(prefijo: string): Producto[] {
    let actual = this.raiz;

    for (let caracter of prefijo) {
      if (actual.hijos[caracter] === undefined) {
        return [];
      }
      actual = actual.hijos[caracter];
    }

    return this.recoger(actual, prefijo, []);
  }

  private recoger(nodo: Nodo, palabra: string, encontrados: Producto[]): Producto[] {
    if (nodo.esFinDePalabra) {
      encontrados.push({ nombre: palabra, popularidad: nodo.popularidad });
    }

    for (let caracter of Object.keys(nodo.hijos)) {
      this.recoger(nodo.hijos[caracter], palabra + caracter, encontrados);
    }

    return encontrados;
  }
}
