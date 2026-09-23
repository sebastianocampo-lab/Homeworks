import { Routes } from '@angular/router';
import { PaginaLibros } from './paginas/pagina-libros/pagina-libros';

export const routes: Routes = [
  { path: '', component: PaginaLibros, title: 'Challenge 04 - Pila de libros' },
  { path: '**', redirectTo: '' },
];
