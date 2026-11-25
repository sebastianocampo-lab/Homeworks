import { Cancion } from '../modelos/cancion';

export class MaxHeap {
    heap: Cancion[] = [];

    constructor(canciones: Cancion[] = []) {
        if (canciones.length > 0) {
            this.heap = [...canciones];
            this.heapify();
        }
    }

    push(value: Cancion): void {
        this.heap.push(value);
        this.percolateUp();
    }

    pop(): Cancion | undefined {
        if (this.heap.length === 0) {
            return undefined;
        }

        this.swap(0, this.heap.length - 1);
        const max = this.heap.pop();
        this.percolateDown(0);

        return max;
    }

    peek(): Cancion | undefined {
        return this.heap[0];
    }

    heapify(): void {
        const inicio = Math.floor((this.heap.length - 2) / 2);

        for (let i = inicio; i >= 0; i--) {
            this.percolateDown(i);
        }
    }

    percolateDown(index: number): void {
        let curr = index;

        while (2 * curr + 1 < this.heap.length) {
            const left = 2 * curr + 1;
            const right = 2 * curr + 2;

            const maxChild =
                right < this.heap.length &&
                    this.heap[right].reproducciones > this.heap[left].reproducciones
                    ? right
                    : left;

            if (this.heap[maxChild].reproducciones > this.heap[curr].reproducciones) {
                this.swap(curr, maxChild);
                curr = maxChild;
            } else {
                break;
            }
        }
    }

    percolateUp(): void {
        let curr = this.heap.length - 1;

        while (curr > 0) {
            const parent = Math.floor((curr - 1) / 2);

            if (this.heap[curr].reproducciones > this.heap[parent].reproducciones) {
                this.swap(curr, parent);
                curr = parent;
            } else {
                break;
            }
        }
    }

    swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    size(): number {
        return this.heap.length;
    }

    toArray(): Cancion[] {
        return [...this.heap];
    }
}
