type completedGraph = {
  from: number;
  to: number;
  weight: number;
};

type GraphEdge = {
  to: number;
  weight: number;
};

type weigthedAdjacencyList = GraphEdge[][];
type wightedAdjacencyMatrix = number[][];

type adjacancyList = number[][];
type adjacencyMatrix = number[][];

export const bfs = (
  graph: wightedAdjacencyMatrix,
  source: number,
  needle: number,
): number[] => {
  if (
    source < 0 ||
    source >= graph.length ||
    needle < 0 ||
    needle >= graph.length
  ) {
    return [];
  }

  const queue = [source];
  const seen = new Set([source]);
  const prev = new Array(graph.length).fill(-1);

  for (let head = 0; head < queue.length; head++) {
    const current = queue[head];

    if (current === needle) break;

    for (const [node, weight] of graph[current].entries()) {
      if (weight === 0 || !Number.isFinite(weight) || seen.has(node)) {
        continue;
      }

      seen.add(node);
      prev[node] = current;
      queue.push(node);
    }
  }

  if (!seen.has(needle)) return [];

  const path: number[] = [];

  for (let current = needle; current !== -1; current = prev[current]) {
    path.push(current);

    if (current === source) break;
  }

  return path.reverse();
};
