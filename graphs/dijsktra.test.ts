import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const graphModuleUrl = new URL("./graph.ts", import.meta.url).href;
type Graph = Parameters<typeof import("./graph").dijsktra>[0];

// A synchronous infinite loop cannot be interrupted by Vitest's test timeout.
// Isolate calls so a broken traversal fails without hanging the test suite.
async function runDijsktra(graph: Graph, source: number, dest: number) {
  const script = `
    import { dijsktra } from ${JSON.stringify(graphModuleUrl)};
    const [graph, source, dest] = JSON.parse(process.argv[1]);
    console.log(JSON.stringify(dijsktra(graph, source, dest)));
  `;

  try {
    const { stdout } = await execFileAsync(
      process.execPath,
      [
        "--experimental-strip-types",
        "--input-type=module",
        "-e",
        script,
        JSON.stringify([graph, source, dest]),
      ],
      { timeout: 1500 },
    );
    return JSON.parse(stdout) as number[] | null;
  } catch (error) {
    if ((error as { killed?: boolean }).killed) {
      throw new Error("dijsktra did not terminate within 1500 ms");
    }
    throw error;
  }
}

describe("dijsktra", () => {
  it("includes both endpoints in a direct path", async () => {
    const graph = [[{ to: 1, weight: 7 }], []];

    expect(await runDijsktra(graph, 0, 1)).toEqual([0, 1]);
  });

  it("chooses the lowest total weight even when it requires more edges", async () => {
    const graph = [
      [{ to: 3, weight: 20 }, { to: 1, weight: 2 }],
      [{ to: 2, weight: 3 }],
      [{ to: 3, weight: 4 }],
      [],
    ];

    expect(await runDijsktra(graph, 0, 3)).toEqual([0, 1, 2, 3]);
  });

  it("updates a previously discovered path when a cheaper route is found", async () => {
    const graph = [
      [{ to: 1, weight: 10 }, { to: 2, weight: 1 }],
      [{ to: 3, weight: 1 }],
      [{ to: 1, weight: 1 }, { to: 3, weight: 9 }],
      [],
    ];

    expect(await runDijsktra(graph, 0, 3)).toEqual([0, 2, 1, 3]);
  });

  it("finds a path when the source is not node zero", async () => {
    const graph = [[], [{ to: 2, weight: 3 }], [{ to: 3, weight: 4 }], []];

    expect(await runDijsktra(graph, 1, 3)).toEqual([1, 2, 3]);
  });

  it("handles cycles and zero-weight edges", async () => {
    const graph = [
      [{ to: 0, weight: 0 }, { to: 1, weight: 0 }, { to: 2, weight: 10 }],
      [{ to: 0, weight: 1 }, { to: 2, weight: 2 }],
      [],
    ];

    expect(await runDijsktra(graph, 0, 2)).toEqual([0, 1, 2]);
  });

  it("returns the source when source and destination are the same", async () => {
    expect(await runDijsktra([[]], 0, 0)).toEqual([0]);
  });

  it("returns null for a disconnected destination", async () => {
    expect(await runDijsktra([[], []], 0, 1)).toBeNull();
  });

  it("returns null when directed edges do not provide a route back", async () => {
    const graph = [[{ to: 1, weight: 2 }], []];

    expect(await runDijsktra(graph, 1, 0)).toBeNull();
  });
});
