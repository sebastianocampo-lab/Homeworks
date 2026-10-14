import { Component, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Nodo } from '../../estructuras/arbol-nario';

@Component({
  selector: 'app-opcion-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './opcion-menu.html',
})
export class OpcionMenu {
  @Input() nodo!: Nodo;
  @Input() nivel = 0;
  // ahora el menu vive dentro de una ruta privada, por eso toca armar el link
  // con el prefijo de la pagina padre
  @Input() base = '';

  abierto = false;

  private router = inject(Router);

  constructor() {
    // si la ruta actual es un hijo de este item, se abre el submenu
    // (sirve cuando se recarga la pagina estando en un submenu)
    this.router.events.pipe(takeUntilDestroyed()).subscribe((evento) => {
      if (evento instanceof NavigationEnd && this.esRutaHija(evento.urlAfterRedirects)) {
        this.abierto = true;
      }
    });
  }

  get tieneHijos(): boolean {
    return this.nodo.hijos.length > 0;
  }

  get ruta(): string {
    return this.base + '/' + this.nodo.valor.link;
  }

  alternar(): void {
    if (this.tieneHijos) {
      this.abierto = !this.abierto;
    }
  }

  private esRutaHija(url: string): boolean {
    return this.tieneHijos && url.startsWith(this.ruta + '/');
  }
}
