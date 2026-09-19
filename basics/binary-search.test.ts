import { describe, expect, it } from "vitest";

import { binarySeach } from "./binary-search.ts";

describe("binarySeach", () => {
  it("returns the index of a value in a sorted array", () => {
    expect(binarySeach([1, 3, 5, 7, 9], 7)).toBe(3);
  });

  it("finds the first and last values", () => {
    const values = [1, 3, 5, 7, 9];

    expect(binarySeach(values, 1)).toBe(0);
    expect(binarySeach(values, 9)).toBe(4);
  });

  it("returns undefined when the value is not present", () => {
    expect(binarySeach([1, 3, 5, 7, 9], 4)).toBeUndefined();
  });

  it("returns undefined for an empty array", () => {
    expect(binarySeach([], 1)).toBeUndefined();
  });

  it("finds a value in a single-item array", () => {
    expect(binarySeach([42], 42)).toBe(0);
  });
});
