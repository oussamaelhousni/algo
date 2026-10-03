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

export const dfs = (
  graph: weigthedAdjacencyList,
  source: number,
  needle: number,
): number[] | null => {
  const path: number[] = [];
  const seen = new Set<number>();
  walk(graph, source, needle, path, seen);
  if (path.length === 0) return null;
  return path;
};

const walk = (
  graph: weigthedAdjacencyList,
  current: number,
  needle: number,
  path: number[],
  seen: Set<number>,
) => {
  if (seen.has(current)) return false;
  seen.add(current);
  path.push(current);
  if (current === needle) return true;
  const list = graph[current];
  for (const node of list) {
    if (walk(graph, node.to, needle, path, seen)) {
      return true;
    }
  }
  path.pop();
  return false;
};

const hasUnvisited = (seen: number[], distances: number[]) => {
  return seen.some((item, i) => !item && distances[i] < Infinity);
};

const getLowestUnivisted = (seen: number[], distances: number[]) => {
  return seen.reduce((lowest, _, idx) => {
    const lowestDist = lowest === -1 ? Infinity : distances[lowest];
    if (lowestDist > distances[idx]) return idx;
    return lowest;
  });
};
export const dijkstra = (
  graph: weigthedAdjacencyList,
  source: number,
  dest: number,
): number[] | null => {
  const distances = new Array(graph.length).fill(Infinity);
  const prev = new Array(graph.length).fill(-1);
  const seen = new Array(graph.length).fill(false);

  distances[source] = 0;
  while (hasUnvisited(seen, distances)) {
    const lowest = getLowestUnivisted(seen, distances);
    seen[lowest] = true;
    const edges = graph[lowest];
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      if (seen[edge.to]) continue;
      seen[edge.to] = true;
      const newDist = distances[lowest] + edge.weight;

      if (newDist < distances[edge.to]) {
        distances[edge.to] = newDist;
        prev[edge.to] = lowest;
      }
    }
  }
  if (prev[dest] === -1) return null;
  const path = [];
  let current = dest;

  while (prev[current] !== -1) {
    path.push(current);
    current = prev[current];
  }
  return path.reverse();
};
