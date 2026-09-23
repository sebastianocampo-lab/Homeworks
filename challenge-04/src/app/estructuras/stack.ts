export class Stack<T> {
  private items: T[] = [];

  push(value: T): void {
    this.items.push(value);
  }

  pop(): T | null {
    return this.items.length > 0 ? (this.items.pop() as T) : null;
  }

  peek(): T | null {
    return this.items.length > 0 ? this.items[this.items.length - 1] : null;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  print(): void {
    this.items
      .slice()
      .reverse()
      .forEach((item) => {
        console.log(item);
      });
  }

  // copia de los items para poder mostrarlos en el html
  getItems(): T[] {
    return this.items.slice();
  }
}
