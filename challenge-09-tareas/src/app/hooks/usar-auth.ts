import { signal } from '@angular/core';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/config';

// firebase devuelve codigos tipo auth/invalid-credential, los paso a algo legible
function traducirError(codigo: string): string {
  switch (codigo) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'El correo o la contrasena no coinciden';
    case 'auth/user-not-found':
      return 'Ese usuario no existe';
    case 'auth/email-already-in-use':
      return 'Ese correo ya tiene una cuenta';
    case 'auth/weak-password':
      return 'La contrasena debe tener minimo 6 caracteres';
    case 'auth/invalid-email':
      return 'El correo no es valido';
    default:
      return 'No se pudo completar la operacion';
  }
}

// aca va toda la logica de firebase auth, el servicio solo la usa
export function usarAuth() {
  const usuario = signal<User | null>(null);
  const cargando = signal(true);
  const error = signal('');

  let avisarListo: () => void;
  const listo = new Promise<void>((resolver) => (avisarListo = resolver));

  // se dispara al entrar, al salir y tambien cuando se recarga la pagina
  onAuthStateChanged(auth, (cuenta) => {
    usuario.set(cuenta);
    cargando.set(false);
    avisarListo();
  });

  async function entrar(correo: string, clave: string): Promise<boolean> {
    error.set('');
    try {
      await signInWithEmailAndPassword(auth, correo, clave);
      return true;
    } catch (e: any) {
      error.set(traducirError(e.code));
      return false;
    }
  }

  async function registrar(correo: string, clave: string): Promise<boolean> {
    error.set('');
    try {
      await createUserWithEmailAndPassword(auth, correo, clave);
      return true;
    } catch (e: any) {
      error.set(traducirError(e.code));
      return false;
    }
  }

  async function salir(): Promise<void> {
    await signOut(auth);
  }

  return { usuario, cargando, error, listo, entrar, registrar, salir };
}
