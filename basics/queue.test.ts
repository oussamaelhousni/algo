import { describe, expect, it } from "vitest";

import { Queue } from "./queue.ts";

describe("Queue", () => {
  it("starts empty", () => {
    const queue = new Queue<number>();

    expect(queue.length).toBe(0);
    expect(queue.peek()).toBeUndefined();
    expect(queue.dequeue()).toBeUndefined();
  });

  it("enqueues values and exposes the next value with peek", () => {
    const queue = new Queue<string>();

    queue.enqueue("first");
    expect(queue.length).toBe(1);
    expect(queue.peek()).toBe("first");

    queue.enqueue("second");
    expect(queue.length).toBe(2);
    expect(queue.peek()).toBe("first");
  });

  it("dequeues values in FIFO order", () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.length).toBe(0);
  });

  it("can be reused after all values are dequeued", () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    expect(queue.dequeue()).toBe(1);

    queue.enqueue(2);

    expect(queue.peek()).toBe(2);
    expect(queue.dequeue()).toBe(2);
    expect(queue.length).toBe(0);
  });
});
