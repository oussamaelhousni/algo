import { describe, expect, it } from "vitest";

import { mazeSolver } from "./mazeSolver.ts";

describe("mazeSolver", () => {
  it("finds a path through a maze", () => {
    const maze = [
      "#######",
      "#     #",
      "### # #",
      "#   # #",
      "#######",
    ];

    expect(mazeSolver(maze, "#", { x: 1, y: 1 }, { x: 5, y: 3 })).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 5, y: 1 },
      { x: 5, y: 2 },
      { x: 5, y: 3 },
    ]);
  });

  it("returns a path containing only open cells", () => {
    const maze = [
      "#####",
      "#   #",
      "# # #",
      "#   #",
      "#####",
    ];

    const path = mazeSolver(maze, "#", { x: 1, y: 1 }, { x: 3, y: 3 });

    expect(path.length).toBeGreaterThan(0);
    expect(path[0]).toEqual({ x: 1, y: 1 });
    expect(path.at(-1)).toEqual({ x: 3, y: 3 });
    expect(path.every(({ x, y }) => maze[y][x] !== "#")).toBe(true);
  });

  it("uses the supplied wall character", () => {
    const maze = [
      "XXXXXX",
      "X   XX",
      "X X  X",
      "X    X",
      "XXXXXX",
    ];

    expect(mazeSolver(maze, "X", { x: 1, y: 1 }, { x: 4, y: 3 })).toEqual([
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
    ]);
  });

  it("returns the start point when the start and end are the same", () => {
    expect(mazeSolver(["###", "# #", "###"], "#", { x: 1, y: 1 }, { x: 1, y: 1 })).toEqual([
      { x: 1, y: 1 },
    ]);
  });
});
