import { describe, expect, it } from "vitest";

import { bubbleSort } from "./bubble-sort.ts";

describe("bubbleSort", () => {
  it("sorts an unsorted array in ascending order", () => {
    expect(bubbleSort([5, 1, 4, 2, 8])).toEqual([1, 2, 4, 5, 8]);
  });

  it("handles an already sorted array", () => {
    expect(bubbleSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles negative numbers", () => {
    expect(bubbleSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("returns an empty array for empty input", () => {
    expect(bubbleSort([])).toEqual([]);
  });

  it("does not mutate the input array", () => {
    const values = [4, 2, 7, 1];

    bubbleSort(values);

    expect(values).toEqual([4, 2, 7, 1]);
  });
});
