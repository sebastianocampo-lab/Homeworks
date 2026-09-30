import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { Nodo } from '../../estructuras/arbol-binario';

interface DatoD3 {
  valor: number | null;
  children?: DatoD3[];
}

@Component({
  selector: 'app-dibujo-arbol',
  imports: [],
  template: `<svg #lienzo class="lienzo"></svg>`,
})
export class DibujoArbol implements AfterViewInit, OnChanges {
  @Input() raiz: Nodo | null = null;
  @Input() resaltado: number | null = null;
  @Input() version = 0;

  @ViewChild('lienzo') lienzo!: ElementRef<SVGSVGElement>;

  ngAfterViewInit(): void {
    this.dibujar();
  }

  ngOnChanges(): void {
    if (this.lienzo) {
      this.dibujar();
    }
  }

  // d3 necesita la estructura { valor, children: [...] }.
  // si un nodo tiene un solo hijo se mete un hijo vacio para que se vea
  // si el que tiene es el izquierdo o el derecho
  private convertir(nodo: Nodo | null): DatoD3 {
    if (!nodo) return { valor: null };
    if (nodo.isLeaf()) return { valor: nodo.valor };
    return {
      valor: nodo.valor,
      children: [this.convertir(nodo.izquierda), this.convertir(nodo.derecha)],
    };
  }

  private dibujar(): void {
    const svg = d3.select(this.lienzo.nativeElement);
    svg.selectAll('*').remove();

    if (!this.raiz) {
      svg.attr('viewBox', '0 0 300 60').attr('height', 60);
      svg
        .append('text')
        .attr('x', 150)
        .attr('y', 35)
        .attr('text-anchor', 'middle')
        .attr('fill', '#666')
        .text('El arbol esta vacio');
      return;
    }

    const jerarquia = d3.hierarchy<DatoD3>(this.convertir(this.raiz));
    const arbolD3 = d3.tree<DatoD3>().nodeSize([48, 80]);
    const raizD3 = arbolD3(jerarquia);

    const nodos = raizD3.descendants();
    const minX = d3.min(nodos, (d) => d.x) ?? 0;
    const maxX = d3.max(nodos, (d) => d.x) ?? 0;
    const maxY = d3.max(nodos, (d) => d.y) ?? 0;

    const margen = 30;
    const ancho = maxX - minX + margen * 2;
    const alto = maxY + margen * 2;

    svg
      .attr('viewBox', `${minX - margen} ${-margen} ${ancho} ${alto}`)
      .attr('height', Math.min(alto, 520));

    const linea = d3
      .linkVertical<d3.HierarchyPointLink<DatoD3>, d3.HierarchyPointNode<DatoD3>>()
      .x((d) => d.x)
      .y((d) => d.y);

    svg
      .append('g')
      .selectAll('path')
      .data(raizD3.links().filter((l) => l.target.data.valor !== null))
      .join('path')
      .attr('d', linea)
      .attr('fill', 'none')
      .attr('stroke', '#999')
      .attr('stroke-width', 1.5);

    const grupoNodos = svg
      .append('g')
      .selectAll('g')
      .data(nodos.filter((d) => d.data.valor !== null))
      .join('g')
      .attr('transform', (d) => `translate(${d.x},${d.y})`);

    grupoNodos
      .append('circle')
      .attr('r', 18)
      .attr('fill', (d) => (d.data.valor === this.resaltado ? '#e67e22' : '#1e3a8a'))
      .attr('stroke', 'white')
      .attr('stroke-width', 2);

    grupoNodos
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'white')
      .attr('font-size', 13)
      .attr('font-weight', 'bold')
      .text((d) => String(d.data.valor));
  }
}
