import { Routes } from '@angular/router';
import { MENU } from './datos/menu';
import { sacarRutas } from './estructuras/arbol-nario';

export const routes: Routes = [
  { path: '', redirectTo: 'perfil', pathMatch: 'full' },
  ...sacarRutas(MENU),
  { path: '**', redirectTo: 'perfil' },
];
