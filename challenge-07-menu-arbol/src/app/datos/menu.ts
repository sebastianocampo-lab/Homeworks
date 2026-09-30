import { Nodo } from '../estructuras/arbol-nario';
import { Perfil } from '../paginas/perfil';
import { Mensajes } from '../paginas/mensajes';
import { Configuracion } from '../paginas/configuracion';
import { Cuenta } from '../paginas/cuenta';
import { Seguridad } from '../paginas/seguridad';
import { Contrasena } from '../paginas/contrasena';
import { Notificaciones } from '../paginas/notificaciones';
import { Ayuda } from '../paginas/ayuda';
import { Preguntas } from '../paginas/preguntas';
import { Ticket } from '../paginas/ticket';
import { EstadoRed } from '../paginas/estado-red';
import { CerrarSesion } from '../paginas/cerrar-sesion';

// la raiz no se pinta, solo sirve para colgar los items principales
const menu = new Nodo({ titulo: 'Menu', link: '', componente: null });

const perfil = new Nodo({ titulo: 'Perfil', link: 'perfil', componente: Perfil });
const mensajes = new Nodo({ titulo: 'Mensajes', link: 'mensajes', componente: Mensajes });

const configuracion = new Nodo({
  titulo: 'Configuracion',
  link: 'configuracion',
  componente: Configuracion,
});
configuracion.agregarHijo(
  new Nodo({ titulo: 'Cuenta', link: 'configuracion/cuenta', componente: Cuenta }),
);
configuracion.agregarHijo(
  new Nodo({ titulo: 'Seguridad y privacidad', link: 'configuracion/seguridad', componente: Seguridad }),
);
configuracion.agregarHijo(
  new Nodo({ titulo: 'Contrasena', link: 'configuracion/contrasena', componente: Contrasena }),
);
configuracion.agregarHijo(
  new Nodo({ titulo: 'Notificaciones', link: 'configuracion/notificaciones', componente: Notificaciones }),
);

const ayuda = new Nodo({ titulo: 'Ayuda', link: 'ayuda', componente: Ayuda });
ayuda.agregarHijo(
  new Nodo({ titulo: 'Preguntas frecuentes', link: 'ayuda/preguntas', componente: Preguntas }),
);
ayuda.agregarHijo(new Nodo({ titulo: 'Enviar un ticket', link: 'ayuda/ticket', componente: Ticket }));
ayuda.agregarHijo(
  new Nodo({ titulo: 'Estado de la red', link: 'ayuda/estado-red', componente: EstadoRed }),
);

const cerrarSesion = new Nodo({
  titulo: 'Cerrar sesion',
  link: 'cerrar-sesion',
  componente: CerrarSesion,
});

menu.agregarHijo(perfil);
menu.agregarHijo(mensajes);
menu.agregarHijo(configuracion);
menu.agregarHijo(ayuda);
menu.agregarHijo(cerrarSesion);

export const MENU = menu;
