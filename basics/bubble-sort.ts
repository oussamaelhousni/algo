export const bubbleSort = (arr: number[]): number[] => {
  const copy = [...arr];
  let isSorted = true;
  do {
    isSorted = true;
    for (let i = 0; i < copy.length - 1; i++) {
      if (copy[i] >= copy[i + 1]) {
        isSorted = false;
        let temp = copy[i];
        copy[i] = copy[i + 1];
        copy[i + 1] = temp;
      }
    }
  } while (isSorted === false);
  return copy;
};
