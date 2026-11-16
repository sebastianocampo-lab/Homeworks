import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RealtimeChannel } from '@supabase/supabase-js';
import { SupabaseService } from '../services/supabase.service';
import { Tarea, TareasService } from '../services/tareas.service';

@Component({
  selector: 'app-tareas',
  imports: [FormsModule],
  templateUrl: './tareas.component.html',
})
export class TareasComponent implements OnInit, OnDestroy {
  protected srv = inject(TareasService);
  private sb = inject(SupabaseService).client;
  private canal?: RealtimeChannel;

  tareas = signal<Tarea[]>([]);
  nueva = '';

  async ngOnInit() {
    await this.cargar();
    this.canal = this.srv.escuchar(() => this.cargar());
  }

  async cargar() {
    const { data } = await this.srv.listar();
    this.tareas.set(data ?? []);
  }

  async agregar() {
    if (!this.nueva.trim()) return;
    await this.srv.crear(this.nueva);
    this.nueva = '';
  }

  async completar(tarea: Tarea) {
    await this.srv.completar(tarea.id, !tarea.completada);
  }

  async borrar(id: number) {
    await this.srv.borrar(id);
  }

  ngOnDestroy() {
    if (this.canal) {
      this.sb.removeChannel(this.canal);
    }
  }
}
