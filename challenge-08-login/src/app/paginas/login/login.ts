import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../servicios/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login {
  correo = signal('');
  clave = signal('');
  error = signal('');

  private auth = inject(Auth);
  private router = inject(Router);

  entrar(): void {
    if (this.auth.entrar(this.correo(), this.clave())) {
      this.router.navigate(['/arbol']);
    } else {
      this.error.set('El correo o la contrasena no coinciden');
      this.clave.set('');
    }
  }
}
