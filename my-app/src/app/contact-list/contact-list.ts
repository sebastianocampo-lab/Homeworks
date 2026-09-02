import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  imports: [],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactListComponent {
  @Input() listaContactos: { nombre: string; telefono: string }[] = [];
  @Output() alEliminar = new EventEmitter<{ nombre: string; telefono: string }>();
}