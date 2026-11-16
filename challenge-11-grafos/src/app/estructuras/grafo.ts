export interface DatosNodo {
  tipo: 'persona' | 'ciudad';
  edad?: number;
}

export class Grafo {
  nodos: string[] = [];
  adyacencia: { [nodo: string]: string[] } = {};
  // el grafo del profe guarda solo nombres, aca guardo aparte los datos de cada uno
  datos: { [nodo: string]: DatosNodo } = {};

  agregarNodo(nodo: string, datos: DatosNodo): void {
    if (!this.buscarNodo(nodo)) {
      this.nodos.push(nodo);
      this.adyacencia[nodo] = [];
      this.datos[nodo] = datos;
    }
  }

  agregarArista(nodo1: string, nodo2: string): void {
    this.adyacencia[nodo1].push(nodo2);
    this.adyacencia[nodo2].push(nodo1);
  }

  buscarNodo(nodo: string): string | undefined {
    if (!this.nodos.length) {
      return undefined;
    }
    return this.nodos.find((n) => n == nodo);
  }

  imprimirAdyacencia(nodo: string): void {
    if (this.buscarNodo(nodo)) {
      console.log(this.adyacencia[nodo]);
    }
  }

  imprimirGrafo(): void {
    console.log(this.adyacencia);
  }

  // los vecinos de una ciudad son justamente las personas que viven ahi
  personasDe(ciudad: string): string[] {
    if (!this.buscarNodo(ciudad)) {
      return [];
    }
    return this.adyacencia[ciudad].filter((n) => this.datos[n].tipo === 'persona');
  }

  ciudades(): string[] {
    return this.nodos.filter((n) => this.datos[n].tipo === 'ciudad');
  }

  edad(persona: string): number | undefined {
    return this.datos[persona].edad;
  }
}
