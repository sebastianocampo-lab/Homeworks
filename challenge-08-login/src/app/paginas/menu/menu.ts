import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuLateral } from '../../componentes/menu-lateral/menu-lateral';

@Component({
  selector: 'app-menu',
  imports: [RouterOutlet, MenuLateral],
  templateUrl: './menu.html',
})
export class Menu {
  // las rutas de las secciones son hijas de /menu
  base = '/menu';
}
