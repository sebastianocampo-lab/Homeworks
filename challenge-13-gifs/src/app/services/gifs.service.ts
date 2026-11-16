import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

export interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: { url: string };
  };
}

@Injectable({ providedIn: 'root' })
export class GifsService {
  gifs = signal<Gif[]>([]);
  cargando = signal(false);
  error = signal('');

  async buscar(texto: string): Promise<void> {
    this.cargando.set(true);
    this.error.set('');

    try {
      const params = new URLSearchParams({
        api_key: environment.giphyApiKey,
        q: texto,
        limit: '25',
        offset: '0',
        rating: 'g',
        lang: 'es',
      });

      const res = await fetch(`https://api.giphy.com/v1/gifs/search?${params}`);

      // fetch no lanza error con un 404 o un 401, toca revisar el ok
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const { data } = await res.json();
      this.gifs.set(data);
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.cargando.set(false);
    }
  }
}
