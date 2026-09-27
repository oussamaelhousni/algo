import { describe, expect, it } from "vitest";

import { MinHeap } from "./heap.ts";

describe("MinHeap", () => {
  it("starts empty", () => {
    const heap = new MinHeap();

    expect(heap.length).toBe(0);
    expect(heap.delete()).toBeUndefined();
    expect(heap.length).toBe(0);
  });

  it("inserts values and deletes them in ascending order", () => {
    const heap = new MinHeap();

    heap.insert(5);
    heap.insert(1);
    heap.insert(4);
    heap.insert(2);
    heap.insert(3);

    expect(heap.length).toBe(5);
    expect(heap.delete()).toBe(1);
    expect(heap.delete()).toBe(2);
    expect(heap.delete()).toBe(3);
    expect(heap.delete()).toBe(4);
    expect(heap.delete()).toBe(5);
    expect(heap.length).toBe(0);
  });

  it("handles duplicate and negative values", () => {
    const heap = new MinHeap();

    for (const value of [3, -1, 3, 0, -5, 2]) {
      heap.insert(value);
    }

    const values: number[] = [];
    while (heap.length > 0) {
      values.push(heap.delete() as number);
    }

    expect(values).toEqual([-5, -1, 0, 2, 3, 3]);
  });

  it("keeps length synchronized after each deletion", () => {
    const heap = new MinHeap();

    heap.insert(10);
    heap.insert(20);
    heap.insert(5);

    expect(heap.length).toBe(3);
    heap.delete();
    expect(heap.length).toBe(2);
    heap.delete();
    expect(heap.length).toBe(1);
    heap.delete();
    expect(heap.length).toBe(0);
  });

  it("can be reused after it becomes empty", () => {
    const heap = new MinHeap();

    heap.insert(2);
    heap.insert(1);
    expect(heap.delete()).toBe(1);
    expect(heap.delete()).toBe(2);
    expect(heap.length).toBe(0);

    heap.insert(4);
    heap.insert(3);

    expect(heap.delete()).toBe(3);
    expect(heap.delete()).toBe(4);
    expect(heap.length).toBe(0);
  });
});
