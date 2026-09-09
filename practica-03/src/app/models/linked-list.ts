export class Node {
  value: any;
  next: Node | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

export class CircularLinkedList {
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