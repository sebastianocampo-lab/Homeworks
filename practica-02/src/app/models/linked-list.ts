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

  size() {
    return this.length;
  }
}