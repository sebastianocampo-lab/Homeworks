import { Injectable, signal } from '@angular/core';

// el unico usuario que acepta el challenge
const CORREO_VALIDO = 'user@mail.com';
const CLAVE_VALIDA = '123';

@Injectable({ providedIn: 'root' })
export class Auth {
  usuario = signal<string | null>(null);

  estaLogueado(): boolean {
    return this.usuario() !== null;
  }

  entrar(correo: string, clave: string): boolean {
    if (correo === CORREO_VALIDO && clave === CLAVE_VALIDA) {
      this.usuario.set(correo);
      return true;
    }
    return false;
  }

  salir(): void {
    this.usuario.set(null);
  }
}
