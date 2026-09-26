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

  it("handles negative numbers and zero", () => {
    const values = [-10, -3, 0, 4, 12];

    expect(binarySeach(values, -10)).toBe(0);
    expect(binarySeach(values, 0)).toBe(2);
    expect(binarySeach(values, 12)).toBe(4);
  });

  it("finds values at either boundary of a two-item array", () => {
    expect(binarySeach([10, 20], 10)).toBe(0);
    expect(binarySeach([10, 20], 20)).toBe(1);
  });

  it("returns undefined when the value is outside the sorted range", () => {
    const values = [10, 20, 30, 40, 50];

    expect(binarySeach(values, 5)).toBeUndefined();
    expect(binarySeach(values, 55)).toBeUndefined();
  });

  it("finds a value when the array contains duplicates", () => {
    const values = [1, 2, 2, 2, 3];
    const index = binarySeach(values, 2);

    expect(index).toBeDefined();
    expect(values[index!]).toBe(2);
  });

  it("does not mutate the input array", () => {
    const values = [1, 3, 5, 7, 9];

    binarySeach(values, 5);

    expect(values).toEqual([1, 3, 5, 7, 9]);
  });
});
