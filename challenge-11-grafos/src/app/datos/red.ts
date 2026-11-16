import { Grafo } from '../estructuras/grafo';

export interface Persona {
  nombre: string;
  edad: number;
  ciudad: string;
}

export const CIUDADES = ['Cali', 'Bogota', 'Medellin'];

export const PERSONAS: Persona[] = [
  { nombre: 'Sebastian', edad: 22, ciudad: 'Cali' },
  { nombre: 'Mariana', edad: 24, ciudad: 'Cali' },
  { nombre: 'Andres', edad: 21, ciudad: 'Cali' },
  { nombre: 'Camila', edad: 26, ciudad: 'Bogota' },
  { nombre: 'Julian', edad: 23, ciudad: 'Bogota' },
  { nombre: 'Laura', edad: 25, ciudad: 'Medellin' },
  { nombre: 'Daniel', edad: 28, ciudad: 'Medellin' },
  { nombre: 'Valentina', edad: 20, ciudad: 'Medellin' },
];

export function armarGrafo(): Grafo {
  const grafo = new Grafo();

  for (let ciudad of CIUDADES) {
    grafo.agregarNodo(ciudad, { tipo: 'ciudad' });
  }

  for (let persona of PERSONAS) {
    grafo.agregarNodo(persona.nombre, { tipo: 'persona', edad: persona.edad });
    // la arista es la que conecta a la persona con la ciudad donde vive
    grafo.agregarArista(persona.nombre, persona.ciudad);
  }

  return grafo;
}
