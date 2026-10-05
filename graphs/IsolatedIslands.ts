export const isolatedIslands = (islands: number[][]): number => {
  if (islands.length === 0 || islands[0].length === 0) return 0;

  let counter = 0;
  for (let i = 0; i < islands.length; i++) {
    for (let j = 0; j < islands[0].length; j++) {
      if (islands[i][j] === 1) {
        counter++;
        walk(islands, i, j);
      }
    }
  }
  return counter;
};

const walk = (islands: number[][], i: number, j: number) => {
  if (i >= islands.length || i < 0 || j >= islands[0].length || j < 0) return;
  if (islands[i][j] === 0) return;
  islands[i][j] = 0;
  walk(islands, i + 1, j);
  walk(islands, i - 1, j);
  walk(islands, i, j + 1);
  walk(islands, i, j - 1);
};
