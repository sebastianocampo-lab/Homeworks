import { Routes } from '@angular/router';
import { MENU } from './datos/menu';
import { sacarRutas } from './estructuras/arbol-nario';
import { sesionGuard } from './guardianes/sesion-guard';
import { Arbol } from './paginas/arbol/arbol';
import { Login } from './paginas/login/login';
import { Menu } from './paginas/menu/menu';
import { NoEncontrado } from './paginas/no-encontrado/no-encontrado';

export const routes: Routes = [
  { path: '', redirectTo: 'arbol', pathMatch: 'full' },
  { path: 'login', component: Login, title: 'Iniciar sesion' },
  {
    path: 'arbol',
    component: Arbol,
    canActivate: [sesionGuard],
    title: 'Arbol n-ario',
  },
  {
    path: 'menu',
    component: Menu,
    canActivate: [sesionGuard],
    title: 'Menu lateral',
    // las secciones del menu salen del mismo arbol, como rutas hijas
    children: [{ path: '', redirectTo: 'perfil', pathMatch: 'full' }, ...sacarRutas(MENU)],
  },
  { path: '**', component: NoEncontrado },
];
