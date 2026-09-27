export class MinHeap {
  public length: number;
  public data: number[];
  constructor() {
    this.length = 0;
    this.data = [];
  }
  heapifyUp(idx: number) {
    if (idx <= 0) {
      return;
    }
    const parentIdx = this.parent(idx);
    if (this.data[parentIdx] > this.data[idx]) {
      const temp = this.data[parentIdx];
      this.data[parentIdx] = this.data[idx];
      this.data[idx] = temp;
      this.heapifyUp(parentIdx);
    }
  }
  heapifyDown(idx: number): void {
    const leftIdx = this.leftChild(idx);
    const rightIdx = this.rightChild(idx);

    if (idx >= this.length || leftIdx >= this.length) {
      return;
    }

    let smallestIdx = leftIdx;

    if (
      rightIdx < this.length &&
      this.data[rightIdx] < this.data[smallestIdx]
    ) {
      smallestIdx = rightIdx;
    }

    if (this.data[idx] <= this.data[smallestIdx]) {
      return;
    }

    [this.data[idx], this.data[smallestIdx]] = [
      this.data[smallestIdx],
      this.data[idx],
    ];

    this.heapifyDown(smallestIdx);
  }
  insert(item: number): void {
    this.data.push(item);
    this.length++;
    this.heapifyUp(this.length - 1);
  }
  delete(): number | undefined {
    if (this.length === 0) {
      return undefined;
    }

    const min = this.data[0];
    const lastValue = this.data.pop()!;
    this.length = this.data.length;

    if (this.length > 0) {
      this.data[0] = lastValue;
      this.heapifyDown(0);
    }

    return min;
  }
  parent(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }
  leftChild(idx: number): number {
    return 2 * idx + 1;
  }
  rightChild(idx: number): number {
    return 2 * idx + 2;
  }
}
