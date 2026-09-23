import { Routes } from '@angular/router';
import { PaginaCajero } from './paginas/pagina-cajero/pagina-cajero';

export const routes: Routes = [
  { path: '', component: PaginaCajero, title: 'Challenge 05 - Cola del cajero' },
  { path: '**', redirectTo: '' },
];
