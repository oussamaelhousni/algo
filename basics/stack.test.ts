import { describe, expect, it } from "vitest";

import { Stack } from "./stack.ts";

describe("Stack", () => {
  it("starts empty", () => {
    const stack = new Stack<number>();

    expect(stack.length).toBe(0);
    expect(stack.peek()).toBeUndefined();
    expect(stack.pop()).toBeUndefined();
  });

  it("increments its length when items are pushed", () => {
    const stack = new Stack<string>();

    stack.push("first");
    expect(stack.length).toBe(1);

    stack.push("second");
    expect(stack.length).toBe(2);
  });

  it("peek returns the most recently pushed value without removing it", () => {
    const stack = new Stack<number>();

    stack.push(1);
    stack.push(2);

    expect(stack.peek()).toBe(2);
    expect(stack.length).toBe(2);
    expect(stack.peek()).toBe(2);
  });

  it("pop removes and returns values in LIFO order", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toBe(3);
    expect(stack.length).toBe(2);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.length).toBe(0);
  });

  it("can be reused after all values are popped", () => {
    const stack = new Stack<string>();
    stack.push("first");
    expect(stack.pop()).toBe("first");

    stack.push("second");

    expect(stack.peek()).toBe("second");
    expect(stack.pop()).toBe("second");
    expect(stack.length).toBe(0);
  });
});
