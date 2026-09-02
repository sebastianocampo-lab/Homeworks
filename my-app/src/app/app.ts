import { Component, signal } from '@angular/core';
import { Loader } from './loader/loader';
import { ContactFormComponent } from './contact-form/contact-form';
import { ContactListComponent } from './contact-list/contact-list';

@Component({
  selector: 'app-root',
  imports: [Loader, ContactFormComponent, ContactListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  estaCargando = signal(true);
  misContactos = signal<{ nombre: string; telefono: string }[]>([]);

  constructor() {
    setTimeout(() => {
      this.misContactos.set([
        { nombre: 'Camilo Herrera', telefono: '3154678912' },
        { nombre: 'Valentina Rios', telefono: '3209871234' },
        { nombre: 'Andres Muñoz', telefono: '3001239876' }
      ]);
      this.estaCargando.set(false);
    }, 2000);
  }

  agregarContacto(contacto: { nombre: string; telefono: string }) {
    this.misContactos.set([...this.misContactos(), contacto]);
  }

  eliminarContacto(contacto: { nombre: string; telefono: string }) {
    this.misContactos.set(
      this.misContactos().filter(c => c.nombre !== contacto.nombre || c.telefono !== contacto.telefono)
    );
  }
}