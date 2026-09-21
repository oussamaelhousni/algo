import { describe, expect, it } from "vitest";

import { DoublyLinkedList } from "./doubly-linkedlist.ts";

type TestNode<T> = {
  value: T;
  prev?: TestNode<T>;
  next?: TestNode<T>;
};

function getHead<T>(list: DoublyLinkedList<T>) {
  return (list as unknown as { head?: TestNode<T> }).head;
}

function getValues<T>(list: DoublyLinkedList<T>) {
  const values: T[] = [];
  let current = getHead(list);

  while (current) {
    values.push(current.value);
    current = current.next;
  }

  return values;
}

describe("DoublyLinkedList", () => {
  it("starts empty", () => {
    const list = new DoublyLinkedList<number>();

    expect(list.length).toBe(0);
    expect(getHead(list)).toBeUndefined();
  });

  it("prepends values and maintains the backward links", () => {
    const list = new DoublyLinkedList<string>();

    list.prepend("second");
    list.prepend("first");

    const head = getHead(list);

    expect(list.length).toBe(2);
    expect(getValues(list)).toEqual(["first", "second"]);
    expect(head?.prev).toBeUndefined();
    expect(head?.next?.prev).toBe(head);
  });

  it("appends values and maintains the backward links", () => {
    const list = new DoublyLinkedList<number>();

    list.append(1);
    list.append(2);

    const head = getHead(list);
    const tail = head?.next;

    expect(list.length).toBe(2);
    expect(getValues(list)).toEqual([1, 2]);
    expect(head?.prev).toBeUndefined();
    expect(tail?.prev).toBe(head);
    expect(tail?.next).toBeUndefined();
  });

  it("inserts at the beginning, middle, and end", () => {
    const list = new DoublyLinkedList<number>();

    list.append(1);
    list.append(3);
    list.insertAt(0, 0);
    list.insertAt(2, 2);
    list.insertAt(4, 10);

    const head = getHead(list);
    const second = head?.next;
    const third = second?.next;
    const fourth = third?.next;
    const fifth = fourth?.next;

    expect(list.length).toBe(5);
    expect(getValues(list)).toEqual([0, 1, 2, 3, 4]);
    expect(head?.prev).toBeUndefined();
    expect(second?.prev).toBe(head);
    expect(third?.prev).toBe(second);
    expect(fourth?.prev).toBe(third);
    expect(fifth?.prev).toBe(fourth);
    expect(fifth?.next).toBeUndefined();
  });

  it("can insert into an empty list", () => {
    const list = new DoublyLinkedList<number>();

    list.insertAt(42, 0);

    expect(list.length).toBe(1);
    expect(getValues(list)).toEqual([42]);
  });

  it("removes the first matching value and maintains the links", () => {
    const list = new DoublyLinkedList<number>();

    list.append(1);
    list.append(2);
    list.append(3);

    list.remove(2);

    const head = getHead(list);
    const tail = head?.next;

    expect(list.length).toBe(2);
    expect(getValues(list)).toEqual([1, 3]);
    expect(head?.prev).toBeUndefined();
    expect(tail?.prev).toBe(head);
  });

  it("removes the head and tail and updates the length", () => {
    const list = new DoublyLinkedList<number>();

    list.append(1);
    list.append(2);
    list.append(3);

    list.remove(1);
    expect(list.length).toBe(2);
    expect(getValues(list)).toEqual([2, 3]);
    expect(getHead(list)?.prev).toBeUndefined();

    list.remove(3);
    expect(list.length).toBe(1);
    expect(getValues(list)).toEqual([2]);
    expect(getHead(list)?.next).toBeUndefined();
  });

  it("does nothing when the value is not present", () => {
    const list = new DoublyLinkedList<number>();

    list.append(1);
    list.append(2);

    list.remove(3);

    expect(list.length).toBe(2);
    expect(getValues(list)).toEqual([1, 2]);
  });

  it("removes the node at the requested index and updates the length", () => {
    const list = new DoublyLinkedList<number>();

    list.append(1);
    list.append(2);
    list.append(3);

    list.removeAt(1);

    const head = getHead(list);
    const tail = head?.next;

    expect(list.length).toBe(2);
    expect(getValues(list)).toEqual([1, 3]);
    expect(head?.prev).toBeUndefined();
    expect(tail?.prev).toBe(head);
    expect(tail?.next).toBeUndefined();
  });

  it("removes the head and tail nodes", () => {
    const list = new DoublyLinkedList<number>();

    list.append(1);
    list.append(2);
    list.append(3);

    list.removeAt(0);
    console.log(getValues(list));
    expect(list.length).toBe(2);
    expect(getValues(list)).toEqual([2, 3]);
    expect(getHead(list)?.prev).toBeUndefined();

    list.removeAt(1);
    expect(list.length).toBe(1);
    expect(getValues(list)).toEqual([2]);
    expect(getHead(list)?.next).toBeUndefined();
  });

  it("does nothing for an empty list or an out-of-range index", () => {
    const list = new DoublyLinkedList<number>();

    list.removeAt(0);
    expect(list.length).toBe(0);
    expect(getValues(list)).toEqual([]);

    list.append(1);
    list.append(2);
    list.removeAt(2);

    expect(list.length).toBe(2);
    expect(getValues(list)).toEqual([1, 2]);
  });

  it("gets the value at each valid index", () => {
    const list = new DoublyLinkedList<string>();

    list.append("first");
    list.append("second");
    list.append("third");

    expect(list.get(0)).toBe("first");
    expect(list.get(1)).toBe("second");
    expect(list.get(2)).toBe("third");
  });

  it("returns undefined for an empty list or an invalid index", () => {
    const list = new DoublyLinkedList<number>();

    expect(list.get(0)).toBeUndefined();

    list.append(1);
    list.append(2);

    expect(list.get(-1)).toBeUndefined();
    expect(list.get(2)).toBeUndefined();
  });
});
