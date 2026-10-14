import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MENU } from '../../datos/menu';
import { bfs, buscar, dfs, recorrerBfs, recorrerDfs } from '../../estructuras/arbol-nario';

@Component({
  selector: 'app-arbol',
  imports: [FormsModule],
  templateUrl: './arbol.html',
})
export class Arbol {
  profundidad = recorrerDfs(MENU);
  anchura = recorrerBfs(MENU);

  texto = signal('');
  resultado = signal('');

  constructor() {
    // los recorridos tambien quedan en consola como en el challenge anterior
    console.log('--- Menu con DFS ---');
    dfs(MENU);
    console.log('--- Menu con BFS ---');
    bfs(MENU);
  }

  revisar(): void {
    const nodo = buscar(MENU, this.texto().trim());

    if (nodo) {
      this.resultado.set(`"${nodo.valor.titulo}" si esta en el arbol (${nodo.hijos.length} hijos)`);
    } else {
      this.resultado.set(`"${this.texto()}" no esta en el arbol`);
    }
  }
}
