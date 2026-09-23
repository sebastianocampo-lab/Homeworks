export class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | null {
    return this.items.length > 0 ? (this.items.shift() as T) : null;
  }

  peek(): T | null {
    return this.items.length > 0 ? this.items[0] : null;
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  print(): void {
    this.items.forEach((item) => {
      console.log(item);
    });
  }

  // copia de los items para poder mostrarlos en el html
  getItems(): T[] {
    return this.items.slice();
  }
}
