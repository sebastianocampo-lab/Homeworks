import { Injectable, signal } from '@angular/core';
import { Cancion } from '../modelos/cancion';
import { Trie } from '../estructuras/trie';
import { MaxHeap } from '../estructuras/heap';
import { Graph } from '../estructuras/grafo';

@Injectable({
  providedIn: 'root',
})
export class MusicaService {
    canciones = signal<Cancion[]>([
    { titulo: 'Medallo', artista: 'Blessd', reproducciones: 980 },
    { titulo: 'Mirame', artista: 'Blessd', reproducciones: 950 },
    { titulo: 'Si Sabe Ferxxo', artista: 'Blessd', reproducciones: 900 },
    { titulo: 'Imposible', artista: 'Blessd', reproducciones: 760 },
    { titulo: 'Tendencia Global', artista: 'Blessd', reproducciones: 720 },
    { titulo: 'Las Morras', artista: 'Blessd', reproducciones: 690 },
    { titulo: 'Ojos Azules', artista: 'Blessd', reproducciones: 640 },
    { titulo: 'Cual Es Esa', artista: 'Pirlo', reproducciones: 930 },
    { titulo: 'Mionca', artista: 'Pirlo', reproducciones: 870 },
    { titulo: 'Bulevar', artista: 'Pirlo', reproducciones: 780 },
    { titulo: 'Cali en el Mapa', artista: 'Pirlo', reproducciones: 740 },
    { titulo: 'En el Cielo', artista: 'Pirlo', reproducciones: 700 },
    { titulo: 'No Entendieron', artista: 'El Americano', reproducciones: 820 },
    { titulo: 'Lejania', artista: 'Ryan Castro', reproducciones: 850 },
    { titulo: 'El Cantante del Ghetto', artista: 'Ryan Castro', reproducciones: 810 },
    { titulo: 'Ohnana', artista: 'Kapo', reproducciones: 960 },
  ]);

  relaciones: string[][] = [
    ['Medallo', 'Mirame'],
    ['Medallo', 'Tendencia Global'],
    ['Mirame', 'Si Sabe Ferxxo'],
    ['Las Morras', 'Ojos Azules'],
    ['Imposible', 'Mionca'],
    ['Cual Es Esa', 'Si Sabe Ferxxo'],
    ['Cual Es Esa', 'Mionca'],
    ['Bulevar', 'Ohnana'],
    ['Mionca', 'Cali en el Mapa'],
    ['Cali en el Mapa', 'En el Cielo'],
    ['No Entendieron', 'En el Cielo'],
    ['No Entendieron', 'Lejania'],
    ['Lejania', 'El Cantante del Ghetto'],
    ['Tendencia Global', 'Las Morras'],
  ];

  trie = new Trie();
  grafo = new Graph();
  heap = new MaxHeap();

  ranking = signal<Cancion[]>([]);
  seleccionada = signal('');

  constructor() {
    for (let cancion of this.canciones()) {
      this.trie.insert(cancion.titulo);
      this.grafo.addNode(cancion.titulo);
    }

    for (let [a, b] of this.relaciones) {
      this.grafo.addEdge(a, b);
    }

    this.heap = new MaxHeap(this.canciones());
    this.actualizarRanking();
  }

  buscarCancion(titulo: string): Cancion | undefined {
    return this.canciones().find((c) => c.titulo.toLowerCase() === titulo.toLowerCase());
  }

  existe(titulo: string): boolean {
    return this.trie.search(titulo.trim());
  }

  sugerencias(prefijo: string): Cancion[] {
    const resultado: Cancion[] = [];

    for (let titulo of this.trie.sugerencias(prefijo)) {
      const cancion = this.buscarCancion(titulo);
      if (cancion) resultado.push(cancion);
    }

    return resultado;
  }

  agregar(titulo: string, artista: string, relacionada: string): string {
    if (this.existe(titulo)) {
      return 'Esa cancion ya esta en la plataforma';
    }

    const nueva: Cancion = { titulo, artista, reproducciones: 0 };
    this.canciones.set([...this.canciones(), nueva]);
    this.trie.insert(titulo);
    this.heap.push(nueva);
    this.grafo.addNode(titulo);

    if (relacionada) {
      this.grafo.addEdge(titulo, relacionada);
    }

    this.actualizarRanking();
    return '';
  }

  // cada vez que suena una cancion cambia su numero, por eso se vuelve a armar el heap
  reproducir(cancion: Cancion): void {
    cancion.reproducciones++;
    this.heap = new MaxHeap(this.canciones());
    this.actualizarRanking();
  }

  relacionadas(titulo: string): Cancion[] {
    const resultado: Cancion[] = [];

    for (let vecina of this.grafo.printAdjacency(titulo)) {
      const cancion = this.buscarCancion(vecina);
      if (cancion) resultado.push(cancion);
    }

    return resultado;
  }

  // se saca de una copia para no vaciar el heap original
  top(k: number): Cancion[] {
    const copia = new MaxHeap(this.heap.toArray());
    const lista: Cancion[] = [];

    while (lista.length < k && copia.size() > 0) {
      lista.push({ ...copia.pop()! });
    }

    return lista;
  }

  actualizarRanking(): void {
    this.ranking.set(this.top(5));
  }
}