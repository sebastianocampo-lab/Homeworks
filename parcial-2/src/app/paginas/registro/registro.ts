import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Sesion } from '../../servicios/sesion';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
})
export class Registro {
  correo = signal('');
  clave = signal('');
  repetir = signal('');
  aviso = signal('');

  sesion = inject(Sesion);

  private router = inject(Router);

  async crearCuenta(): Promise<void> {
    if (this.clave() !== this.repetir()) {
      this.aviso.set('Las contrasenas no son iguales');
      return;
    }

    this.aviso.set('');
    const creada = await this.sesion.registrar(this.correo(), this.clave());

    if (creada) {
      this.router.navigate(['/explorador']);
    }
  }
}