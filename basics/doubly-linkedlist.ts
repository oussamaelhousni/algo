type DNode<T> = {
  value: T;
  prev?: DNode<T>;
  next?: DNode<T>;
};

export class DoublyLinkedList<T> {
  public length: number;
  private head?: DNode<T>;
  constructor() {
    this.length = 0;
    this.head = undefined;
  }
  prepend(item: T) {
    const node: DNode<T> = {
      value: item,
    };
    this.length++;
    if (!this.head) {
      this.head = node;
      return;
    }
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }
  append(item: T) {
    const node: DNode<T> = {
      value: item,
    };
    this.length++;
    if (!this.head) {
      this.head = node;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    node.prev = current;
    current.next = node;
  }
  insertAt(item: T, index: number) {
    if (index <= 0) {
      this.prepend(item);
      return;
    }

    if (index >= this.length) {
      this.append(item);
      return;
    }

    let current = this.head!;

    // Stop at the node before the insertion position.
    for (let i = 0; i < index - 1; i++) {
      current = current.next!;
    }

    const node: DNode<T> = {
      value: item,
      prev: current,
      next: current.next,
    };

    current.next!.prev = node;
    current.next = node;
    this.length++;
  }
  remove(item: T) {
    if (!this.head) return;
    if (this.head.value === item) {
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = undefined;
      }
      this.length--;
      return;
    }
    let current = this.head;
    while (current.next && current.next.value !== item) {
      current = current.next;
    }
    if (current.next) {
      current.next = current.next.next;
      if (current.next) current.next.prev = current;
      this.length--;
    }
  }
  removeAt(index: number) {
    if (!this.head) {
      return;
    }
    if (index === 0 && this.head) {
      this.length--;
      this.head = this.head.next;
      if (this.head) this.head.prev = undefined;
      return;
    }
    let current: DNode<T> | undefined = this.head;
    for (let i = 0; i < index - 1 && current; i++) {
      current = current.next;
    }
    if (current && current.next) {
      this.length--;
      current.next = current.next.next;
      if (current.next) {
        current.next.prev = current;
      }
    }
  }
  get(index: number) {
    if (index < 0 || index >= this.length) return;
    let current = this.head;
    for (let i = 0; i < index && current; i++) {
      current = current.next;
    }
    return current?.value;
  }
}
