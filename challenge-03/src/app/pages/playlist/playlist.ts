import { Component, signal } from '@angular/core';
import { LinkedList, Node } from '../../models/linked-list';

@Component({
  selector: 'app-playlist',
  imports: [],
  templateUrl: './playlist.html',
  styleUrl: './playlist.css'
})
export class Playlist {
  playlist = new LinkedList();
  cancionActual = signal<Node | null>(null);
  canciones = signal<string[]>([]);

  constructor() {
    this.playlist.append('Cancion 1');
    this.playlist.append('Cancion 2');
    this.playlist.append('Cancion 3');
    this.playlist.append('Cancion 4');
    this.playlist.append('Cancion 5');

    this.cancionActual.set(this.playlist.head);
    this.canciones.set(this.toArray());
  }

  toArray(): string[] {
    const result: string[] = [];
    let current = this.playlist.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  siguiente() {
    const actual = this.cancionActual();
    if (actual && actual.next) {
      this.cancionActual.set(actual.next);
    }
  }

  reiniciar() {
    this.cancionActual.set(this.playlist.head);
  }
}