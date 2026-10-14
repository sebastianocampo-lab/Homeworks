import { Injectable, computed } from '@angular/core';
import { usarAuth } from '../hooks/usar-auth';

// servicio que maneja los datos de login y registro
@Injectable({ providedIn: 'root' })
export class Sesion {
  private firebase = usarAuth();

  usuario = this.firebase.usuario;
  cargando = this.firebase.cargando;
  error = this.firebase.error;

  correo = computed(() => this.usuario()?.email ?? '');

  estaLogueado(): boolean {
    return this.usuario() !== null;
  }

  // el guard la usa para no decidir antes de que firebase revise la sesion
  esperarRevision(): Promise<void> {
    return this.firebase.listo;
  }

  entrar(correo: string, clave: string): Promise<boolean> {
    return this.firebase.entrar(correo, clave);
  }

  registrar(correo: string, clave: string): Promise<boolean> {
    return this.firebase.registrar(correo, clave);
  }

  salir(): Promise<void> {
    return this.firebase.salir();
  }
}
