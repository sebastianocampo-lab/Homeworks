import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarea, Tareas } from '../../servicios/tareas';

@Component({
  selector: 'app-lista-tareas',
  imports: [FormsModule],
  templateUrl: './tareas.html',
})
export class ListaTareas implements OnInit {
  tareas = inject(Tareas);

  nueva = signal('');
  // guardo el id de la tarea que se esta editando, null si ninguna
  editando = signal<string | null>(null);
  textoEditado = signal('');

  ngOnInit(): void {
    this.tareas.cargar();
  }

  async agregar(): Promise<void> {
    await this.tareas.crear(this.nueva());
    this.nueva.set('');
  }

  abrirEdicion(tarea: Tarea): void {
    this.editando.set(tarea.id!);
    this.textoEditado.set(tarea.titulo);
  }

  async guardar(tarea: Tarea): Promise<void> {
    await this.tareas.renombrar(tarea.id!, this.textoEditado());
    this.editando.set(null);
  }

  cancelar(): void {
    this.editando.set(null);
  }
}
