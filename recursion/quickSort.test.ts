import { describe, expect, it } from "vitest";

import { quickSort } from "./quickSort.ts";

describe("quickSort", () => {
  it("sorts an unsorted array in ascending order", () => {
    const values = [5, 1, 4, 2, 8];

    quickSort(values);

    expect(values).toEqual([1, 2, 4, 5, 8]);
  });

  it("handles duplicates and negative numbers", () => {
    const values = [3, -1, 3, 0, -5, 2];

    quickSort(values);

    expect(values).toEqual([-5, -1, 0, 2, 3, 3]);
  });

  it("handles empty and already sorted arrays", () => {
    const empty: number[] = [];
    const sorted = [1, 2, 3, 4];

    quickSort(empty);
    quickSort(sorted);

    expect(empty).toEqual([]);
    expect(sorted).toEqual([1, 2, 3, 4]);
  });

  it("handles an array with one item", () => {
    const values = [42];

    quickSort(values);

    expect(values).toEqual([42]);
  });
});
