import { Component, signal } from '@angular/core';
import { Playlist } from './pages/playlist/playlist';
import { History } from './pages/history/history';

@Component({
  selector: 'app-root',
  imports: [Playlist, History],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  paginaActiva = signal<'playlist' | 'history'>('playlist');

  // Cambia a la página de playlist
  mostrarPlaylist() {
    this.paginaActiva.set('playlist');
  }

  // Cambia a la página de historial
  mostrarHistory() {
    this.paginaActiva.set('history');
  }
}