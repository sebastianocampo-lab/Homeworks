import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MinHeap } from './estructuras/heap';
import { Producto, Trie } from './estructuras/trie';
import { PRODUCTOS } from './datos/productos';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  titulo = 'Challenge 12 - Buscador con Trie y Heap';

  trie = new Trie();

  prefijo = signal('air');
  k = signal(2);

  coincidencias = signal<Producto[]>([]);
  mejores = signal<Producto[]>([]);

  constructor() {
    for (let producto of PRODUCTOS) {
      this.trie.insertar(producto.nombre, producto.popularidad);
    }
    this.buscar();
  }

  buscar(): void {
    const encontrados = this.trie.buscarPorPrefijo(this.prefijo().toLowerCase().trim());
    this.coincidencias.set(encontrados);
    this.mejores.set(this.topK(encontrados, this.k()));
  }

  // voy metiendo todo al heap y cuando pasa de k saco el menos popular,
  // asi al final solo quedan los k mejores
  private topK(productos: Producto[], k: number): Producto[] {
    const heap = new MinHeap();

    for (let producto of productos) {
      heap.push(producto);

      if (heap.size() > k) {
        heap.pop();
      }
    }

    return heap.toArray().sort((a, b) => b.popularidad - a.popularidad);
  }
}
