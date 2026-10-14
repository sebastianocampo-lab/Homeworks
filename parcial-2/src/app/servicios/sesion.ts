import { Injectable, signal } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/config';

@Injectable({ providedIn: 'root' })
export class Sesion {
  usuario = signal<string | null>(null);
  error = signal('');

  estaLogueado(): boolean {
    return this.usuario() !== null;
  }

  async entrar(correo: string, clave: string): Promise<boolean> {
    this.error.set('');
    try {
      const credencial = await signInWithEmailAndPassword(auth, correo, clave);
      this.usuario.set(credencial.user.email);
      return true;
    } catch (e: any) {
      this.error.set(e.message);
      return false;
    }
  }

  async registrar(correo: string, clave: string): Promise<boolean> {
    this.error.set('');
    try {
      const credencial = await createUserWithEmailAndPassword(auth, correo, clave);
      this.usuario.set(credencial.user.email);
      return true;
    } catch (e: any) {
      this.error.set(e.message);
      return false;
    }
  }

  async salir(): Promise<void> {
    await signOut(auth);
    this.usuario.set(null);
  }
}