type QNode<T> = {
  value: T;
  next?: QNode<T>;
};

export class Queue<T> {
  public length: number;
  public head?: QNode<T>;
  public tail?: QNode<T>;

  constructor() {
    this.length = 0;
    this.head = this.tail = undefined;
  }

  enqueue(item: T) {
    const node: QNode<T> = { value: item, next: undefined };
    this.length++;
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }
    this.tail!.next = node;
    this.tail = node;
  }
  dequeue(): T | undefined {
    if (!this.head) {
      return;
    }
    this.length--;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = undefined;
    }
    return value;
  }
  peek(): T | undefined {
    return this.head?.value;
  }
}
