import { Routes } from '@angular/router';
import { PaginaArbol } from './paginas/pagina-arbol/pagina-arbol';

export const routes: Routes = [
  { path: '', component: PaginaArbol, title: 'Challenge 06 - Arbol binario' },
  { path: '**', redirectTo: '' },
];
