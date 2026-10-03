import { describe, expect, it } from "vitest";
import { bfs, dfs } from "./graph";

describe("bfs", () => {
  it("returns a shortest path from source to target", () => {
    const graph = [
      [0, 1, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
    ];

    expect(bfs(graph, 0, 4)).toEqual([0, 2, 4]);
  });

  it("treats matrix values as edge existence, not traversal cost", () => {
    const graph = [
      [0, 100, 1, 0],
      [0, 0, 0, 100],
      [0, 0, 0, 1],
      [0, 0, 0, 0],
    ];

    // Both routes have two edges; BFS chooses the first one discovered.
    expect(bfs(graph, 0, 3)).toEqual([0, 1, 3]);
  });

  it("ignores zero and non-finite matrix entries", () => {
    const graph = [
      [0, 0, Infinity, Number.NaN],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    expect(bfs(graph, 0, 2)).toEqual([]);
    expect(bfs(graph, 0, 3)).toEqual([]);
  });

  it("returns an empty path when the target is unreachable", () => {
    const graph = [
      [0, 1, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    expect(bfs(graph, 0, 2)).toEqual([]);
  });

  it("returns the source when source and target are the same", () => {
    expect(bfs([[0]], 0, 0)).toEqual([0]);
  });

  it("returns an empty path for invalid source or target indices", () => {
    const graph = [[0, 1], [0, 0]];

    expect(bfs(graph, -1, 1)).toEqual([]);
    expect(bfs(graph, 0, 2)).toEqual([]);
  });
});

describe("dfs", () => {
  it("returns a depth-first path from source to target", () => {
    const graph = [
      [
        { to: 1, weight: 1 },
        { to: 2, weight: 1 },
      ],
      [{ to: 3, weight: 1 }],
      [{ to: 4, weight: 1 }],
      [{ to: 4, weight: 1 }],
      [],
    ];

    expect(dfs(graph, 0, 4)).toEqual([0, 1, 3, 4]);
  });

  it("backtracks when a branch does not reach the target", () => {
    const graph = [
      [
        { to: 1, weight: 1 },
        { to: 2, weight: 1 },
      ],
      [{ to: 3, weight: 1 }],
      [{ to: 4, weight: 1 }],
      [],
      [],
    ];

    expect(dfs(graph, 0, 4)).toEqual([0, 2, 4]);
  });

  it("does not loop when the graph contains a cycle", () => {
    const graph = [
      [{ to: 1, weight: 1 }],
      [
        { to: 0, weight: 1 },
        { to: 2, weight: 1 },
      ],
      [],
    ];

    expect(dfs(graph, 0, 2)).toEqual([0, 1, 2]);
  });

  it("returns the source when source and target are the same", () => {
    expect(dfs([[]], 0, 0)).toEqual([0]);
  });

  it("returns null when the target is unreachable", () => {
    const graph = [
      [{ to: 1, weight: 1 }],
      [],
      [],
    ];

    expect(dfs(graph, 0, 2)).toBeNull();
  });
});
