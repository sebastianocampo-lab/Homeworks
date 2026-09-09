export class Node {
  value: any;
  next: Node | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  head: Node | null;
  tail: Node | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: any) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail!.next = newNode;
    }

    this.tail = newNode;
    this.length++;
  }

  size() {
    return this.length;
  }

    remove(value: any, current: Node | null = this.head): void {
    if (!this.head)
      return;

    if (this.head.value === value) {
      this.head = this.head.next;

      if (!this.head) {
        this.tail = null;
      }
      this.length--;
      return;
    }

    current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      if (!current.next) this.tail = current;
      this.length--;
    }
  }


}

export class DoubleNode {
  value: any;
  next: DoubleNode | null;
  prev: DoubleNode | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class DoubleLinkedList {
  head: DoubleNode | null;
  tail: DoubleNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: any) {
    const newNode = new DoubleNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return;
    }

    this.tail!.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
    this.length++;
  }

  remove(value: any) {
    if (!this.head) return null;

    let current = this.head;

    while (current) {
      if (current.value === value) {
        if (current === this.head) {
          this.head = current.next;
          if (this.head) this.head.prev = null;
        }

        if (current === this.tail) {
          this.tail = current.prev;
          if (this.tail) this.tail.next = null;
        }

        if (current.prev) current.prev.next = current.next;
        if (current.next) current.next.prev = current.prev;

        this.length--;
        return current;
      }
      current = current.next!;
    }

    return null;
  }

  size() {
    return this.length;
  }
}

export class CircularNode {
  value: any;
  next: CircularNode | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

export class CircularLinkedList {
  head: CircularNode | null;
  tail: CircularNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: any) {
    const newNode = new CircularNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.next = this.head;
      this.tail = newNode;
    }

    this.length++;
  }

  size() {
    return this.length;
  }
}

export class CircularDoubleNode {
  value: any;
  next: CircularDoubleNode | null;
  prev: CircularDoubleNode | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class CircularDoubleLinkedList {
  head: CircularDoubleNode | null;
  tail: CircularDoubleNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: any) {
    const newNode = new CircularDoubleNode(value);

    if (!this.head) {
      // Primer nodo: se apunta a sí mismo en ambas direcciones
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      // Conectar el nuevo nodo entre el tail y el head (cierra el círculo)
      newNode.prev = this.tail;
      newNode.next = this.head;
      this.tail!.next = newNode;
      this.head.prev = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  size() {
    return this.length;
  }
}