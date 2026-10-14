import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Sesion } from '../../servicios/sesion';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  correo = signal('');
  clave = signal('');

  sesion = inject(Sesion);

  private router = inject(Router);

  async entrar(): Promise<void> {
    const entro = await this.sesion.entrar(this.correo(), this.clave());

    if (entro) {
      this.router.navigate(['/explorador']);
    } else {
      this.clave.set('');
    }
  }
}