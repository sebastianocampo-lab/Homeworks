import { Component, Input } from '@angular/core';
import { MENU } from '../../datos/menu';
import { OpcionMenu } from '../opcion-menu/opcion-menu';

@Component({
  selector: 'app-menu-lateral',
  imports: [OpcionMenu],
  template: `
    <aside class="sidebar">
      <p class="sidebar-titulo">Mi cuenta</p>
      @for (item of menu.hijos; track item.valor.link) {
        <app-opcion-menu [nodo]="item" [base]="base" />
      }
    </aside>
  `,
})
export class MenuLateral {
  @Input() base = '';

  menu = MENU;
}
