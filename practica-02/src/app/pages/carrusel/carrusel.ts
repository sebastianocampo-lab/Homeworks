import { Component, signal } from '@angular/core';
import { DoubleLinkedList, DoubleNode } from '../../models/linked-list';
import { Producto } from '../../models/producto';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-carrusel',
  imports: [ProductCard],
  templateUrl: './carrusel.html',
  styleUrl: './carrusel.css',
})
export class Carrusel {
  productos = new DoubleLinkedList();
  productoActual = signal<DoubleNode | null>(null);

  constructor() {
    this.productos.append({ nombre: 'Laptop', precio: 2500000 });
    this.productos.append({ nombre: 'PC', precio: 5500000 });
    this.productos.append({ nombre: 'Audifonos', precio: 500000 });
    this.productos.append({ nombre: 'Teclado', precio: 220000 });
    this.productos.append({ nombre: 'Mouse', precio: 100000 });

    this.productoActual.set(this.productos.head);

    setInterval(() => {
      this.siguiente();
    }, 3000);
  }

  siguiente() {
    const actual = this.productoActual();
    if (!actual) return;

    if (actual.next) {
      this.productoActual.set(actual.next);
    } else {
      this.productoActual.set(this.productos.head);
    }
  }

  anterior() {
    const actual = this.productoActual();
    if (!actual) return;

    if (actual.prev) {
      this.productoActual.set(actual.prev);
    } else {
      this.productoActual.set(this.productos.tail);
    }
  }
}