import { Component, signal } from '@angular/core';
import { Grafo } from './estructuras/grafo';
import { armarGrafo } from './datos/red';

interface Punto {
  nombre: string;
  x: number;
  y: number;
}

interface Linea {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  titulo = 'Challenge 11 - Grafo de personas y ciudades';

  grafo: Grafo = armarGrafo();
  ciudades = this.grafo.ciudades();

  seleccionada = signal(this.ciudades[0]);

  puntosCiudad: Punto[] = [];
  puntosPersona: Punto[] = [];
  lineas: Linea[] = [];

  constructor() {
    this.ubicar();
    this.grafo.imprimirGrafo();
  }

  elegir(ciudad: string): void {
    this.seleccionada.set(ciudad);
    this.grafo.imprimirAdyacencia(ciudad);
  }

  personas(): string[] {
    return this.grafo.personasDe(this.seleccionada());
  }

  edad(persona: string): number | undefined {
    return this.grafo.edad(persona);
  }

  // reparto las ciudades en un circulo grande y las personas alrededor de su ciudad
  private ubicar(): void {
    const centroX = 400;
    const centroY = 260;
    const radioCiudades = 150;
    const radioPersonas = 88;

    this.ciudades.forEach((ciudad, i) => {
      const angulo = (2 * Math.PI * i) / this.ciudades.length - Math.PI / 2;
      const x = centroX + radioCiudades * Math.cos(angulo);
      const y = centroY + radioCiudades * Math.sin(angulo);
      this.puntosCiudad.push({ nombre: ciudad, x, y });

      const vecinos = this.grafo.personasDe(ciudad);
      vecinos.forEach((persona, j) => {
        const paso = (2 * Math.PI * j) / vecinos.length + angulo;
        const px = x + radioPersonas * Math.cos(paso);
        const py = y + radioPersonas * Math.sin(paso);
        this.puntosPersona.push({ nombre: persona, x: px, y: py });
        this.lineas.push({ x1: x, y1: y, x2: px, y2: py });
      });
    });
  }
}
