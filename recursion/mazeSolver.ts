type Point = {
  x: number;
  y: number;
};

const directions: [number, number][] = [
  [-1, 0], // left
  [0, 1], // down
  [1, 0], // right
  [0, -1], // up
];

const walk = (
  maze: string[],
  current: Point,
  end: Point,
  wall: string,
  path: Point[],
  seen: Set<string>,
): boolean => {
  const row = maze[current.y];
  if (
    !row ||
    current.x < 0 ||
    current.x >= row.length ||
    row[current.x] === wall
  ) {
    return false;
  }

  const key = `${current.x},${current.y}`;
  if (seen.has(key)) {
    return false;
  }
  seen.add(key);
  path.push(current);

  if (current.x === end.x && current.y === end.y) {
    return true;
  }

  for (const [dx, dy] of directions) {
    if (
      walk(
        maze,
        { x: current.x + dx, y: current.y + dy },
        end,
        wall,
        path,
        seen,
      )
    ) {
      return true;
    }
  }

  path.pop();
  return false;
};

export const mazeSolver = (
  maze: string[],
  wall: string,
  start: Point,
  end: Point,
): Point[] => {
  if (maze.length === 0) {
    return [];
  }

  const path: Point[] = [];
  const seen = new Set<string>();
  return walk(maze, start, end, wall, path, seen) ? path : [];
};
