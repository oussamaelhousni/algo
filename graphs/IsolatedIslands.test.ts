import { describe, expect, it } from "vitest";

import { isolatedIslands } from "./IsolatedIslands";

describe("isolatedIslands", () => {
  it("returns zero for an empty grid", () => {
    expect(isolatedIslands([])).toBe(0);
  });

  it("returns zero when the grid contains no islands", () => {
    expect(
      isolatedIslands([
        [0, 0, 0],
        [0, 0, 0],
      ]),
    ).toBe(0);
  });

  it("counts a single island", () => {
    expect(
      isolatedIslands([
        [0, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ]),
    ).toBe(1);
  });

  it("counts separate islands", () => {
    expect(
      isolatedIslands([
        [1, 0, 0, 1],
        [0, 0, 0, 0],
        [1, 1, 0, 0],
      ]),
    ).toBe(3);
  });

  it("does not connect islands that only touch diagonally", () => {
    expect(
      isolatedIslands([
        [1, 0],
        [0, 1],
      ]),
    ).toBe(2);
  });

  it("counts a grid of connected land as one island", () => {
    expect(
      isolatedIslands([
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ]),
    ).toBe(1);
  });
});
