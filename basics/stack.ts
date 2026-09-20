type QNode<T> = {
  value: T;
  next?: QNode<T>;
};

export class Stack<T> {
  public length: number;
  private head?: QNode<T>;
  constructor() {
    this.length = 0;
    this.head = undefined;
  }

  push(item: T) {
    const node = {
      value: item,
      next: this.head,
    };
    this.head = node;
    this.length++;
  }
  pop() {
    if (!this.head) {
      return;
    }
    this.length--;
    const value = this.head.value;
    this.head = this.head.next;
    return value;
  }
  peek() {
    return this.head?.value;
  }
}
