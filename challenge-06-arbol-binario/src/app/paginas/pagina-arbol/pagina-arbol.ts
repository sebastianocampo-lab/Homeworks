import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArbolBinario } from '../../estructuras/arbol-binario';
import { DibujoArbol } from '../../componentes/dibujo-arbol/dibujo-arbol';

const SERIE_INICIAL = [50, 30, 70, 20, 40, 60, 80, 35, 65, 85];

@Component({
  selector: 'app-pagina-arbol',
  imports: [FormsModule, DibujoArbol],
  templateUrl: './pagina-arbol.html',
})
export class PaginaArbol {
  arbol = new ArbolBinario();
  version = 0;

  serieTexto = '';
  valorBuscado: number | null = null;
  resaltado: number | null = null;

  mensaje = '';
  nombreRecorrido = '';
  recorrido: number[] = [];

  constructor() {
    SERIE_INICIAL.forEach((numero) => this.arbol.insertar(numero));

    console.log('Serie insertada:', SERIE_INICIAL);
    console.log('--- Inorden ---');
    this.arbol.inorden(this.arbol.raiz);
    console.log('--- Preorden ---');
    this.arbol.preorden(this.arbol.raiz);
    console.log('--- Postorden ---');
    this.arbol.postorden(this.arbol.raiz);
  }

  agregarSerie(): void {
    const numeros = this.serieTexto
      .split(',')
      .map((texto) => texto.trim())
      .filter((texto) => texto !== '')
      .map(Number);

    if (numeros.length === 0 || numeros.some((n) => isNaN(n))) {
      this.mensaje = 'Escribe numeros separados por coma, ej: 15, 45, 90';
      return;
    }

    const agregados: number[] = [];
    const repetidos: number[] = [];

    numeros.forEach((numero) => {
      if (this.arbol.insertar(numero)) {
        agregados.push(numero);
      } else {
        repetidos.push(numero);
      }
    });

    this.mensaje = `Se insertaron: ${agregados.join(', ') || 'ninguno'}`;
    if (repetidos.length > 0) {
      this.mensaje += ` | Ya estaban en el arbol: ${repetidos.join(', ')}`;
    }

    this.serieTexto = '';
    this.resaltado = null;
    this.redibujar();
  }

  buscar(): void {
    if (this.valorBuscado === null) {
      this.mensaje = 'Escribe un numero para buscar';
      return;
    }

    const valor = Number(this.valorBuscado);
    if (this.arbol.existe(valor)) {
      this.mensaje = `existe(${valor}): true, el ${valor} si esta en el arbol`;
      this.resaltado = valor;
    } else {
      this.mensaje = `existe(${valor}): false, el ${valor} no esta en el arbol`;
      this.resaltado = null;
    }
    this.redibujar();
  }

  mostrarPreorden(): void {
    console.log('--- Preorden ---');
    this.recorrido = this.arbol.preorden(this.arbol.raiz);
    this.nombreRecorrido = 'Preorden (N-I-D)';
  }

  mostrarInorden(): void {
    console.log('--- Inorden ---');
    this.recorrido = this.arbol.inorden(this.arbol.raiz);
    this.nombreRecorrido = 'Inorden (I-N-D)';
  }

  mostrarPostorden(): void {
    console.log('--- Postorden ---');
    this.recorrido = this.arbol.postorden(this.arbol.raiz);
    this.nombreRecorrido = 'Postorden (I-D-N)';
  }

  vaciarArbol(): void {
    this.arbol = new ArbolBinario();
    this.recorrido = [];
    this.nombreRecorrido = '';
    this.resaltado = null;
    this.mensaje = 'Se vacio el arbol';
    this.redibujar();
  }

  private redibujar(): void {
    // el arbol se modifica por dentro, entonces se sube la version
    // para que el componente de d3 se entere y lo vuelva a pintar
    this.version++;
  }
}
