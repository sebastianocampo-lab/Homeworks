import { Persona } from '../modelos/persona';

const NOMBRES = [
  'Sebastian Ocampo',
  'Laura Restrepo',
  'Andres Villamizar',
  'Camila Zapata',
  'Julian Moreno',
];

export function horaAleatoria(minutosAtras = 60): Date {
  const minutos = Math.floor(Math.random() * minutosAtras);
  const segundos = Math.floor(Math.random() * 60);
  const hora = new Date();
  hora.setMinutes(hora.getMinutes() - minutos);
  hora.setSeconds(hora.getSeconds() - segundos);
  return hora;
}

// la hora del que llega se genera despues del ultimo de la fila,
// si no el orden por hora no coincidiria con el orden real de la cola
export function horaDespuesDe(ultimaHora: Date | null): Date {
  const ahora = Date.now();
  const desde = ultimaHora ? ultimaHora.getTime() : ahora - 60000;
  return new Date(desde + Math.random() * Math.max(ahora - desde, 1000));
}

export function personasIniciales(): Persona[] {
  return NOMBRES.map((nombre, i) => ({
    id: i + 1,
    nombre,
    monto: (Math.floor(Math.random() * 18) + 2) * 50000,
    horaLlegada: horaAleatoria(),
  }));
}
