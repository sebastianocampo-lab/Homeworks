import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-encontrado',
  imports: [RouterLink],
  template: `
    <h2>404</h2>
    <p>La pagina que buscas no existe.</p>
    <a routerLink="/arbol">Volver</a>
  `,
})
export class NoEncontrado {}
