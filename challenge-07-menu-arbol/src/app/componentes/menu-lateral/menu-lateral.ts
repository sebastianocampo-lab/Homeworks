import { Component } from '@angular/core';
import { MENU } from '../../datos/menu';
import { bfs, dfs } from '../../estructuras/arbol-nario';
import { OpcionMenu } from '../opcion-menu/opcion-menu';

@Component({
  selector: 'app-menu-lateral',
  imports: [OpcionMenu],
  template: `
    <aside class="sidebar">
      <p class="sidebar-titulo">Mi cuenta</p>
      @for (item of menu.hijos; track item.valor.link) {
        <app-opcion-menu [nodo]="item" />
      }
    </aside>
  `,
})
export class MenuLateral {
  menu = MENU;

  constructor() {
    console.log('--- Menu con DFS ---');
    dfs(this.menu);
    console.log('--- Menu con BFS ---');
    bfs(this.menu);
  }
}
