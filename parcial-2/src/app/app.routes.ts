import { Routes } from '@angular/router';
import { ExploradorPagina } from './paginas/explorador/explorador';
import { Login } from './paginas/login/login';
import { Registro } from './paginas/registro/registro';
import { sesionGuard } from './guardianes/sesion-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'explorador', pathMatch: 'full' },
  { path: 'login', component: Login, title: 'Iniciar sesion' },
  { path: 'registro', component: Registro, title: 'Crear cuenta' },
  { path: 'explorador', component: ExploradorPagina, canActivate: [sesionGuard], title: 'Explorador', },
];