import { describe, expect, it } from "vitest";

import { twoCristal } from "./two-cristal-problem.ts";

describe("twoCristal", () => {
  it("returns the index of the first broken crystal", () => {
    expect(twoCristal([false, false, false, true, true])).toBe(3);
  });

  it("handles the first crystal being broken", () => {
    expect(twoCristal([true, true, true, true])).toBe(0);
  });

  it("handles a non-square number of crystals", () => {
    expect(twoCristal([false, false, false, false, true])).toBe(4);
  });

  it("returns undefined when no crystal is broken", () => {
    expect(twoCristal([false, false, false, false])).toBeUndefined();
  });

  it("returns undefined for an empty collection", () => {
    expect(twoCristal([])).toBeUndefined();
  });
});
