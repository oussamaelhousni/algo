export const twoCristal = (arr: boolean[]) => {
  let squareRootN = Math.floor(Math.sqrt(arr.length));
  let index = 0;
  while (index < arr.length && !arr[index]) {
    index += squareRootN;
  }
  for (let i = index - squareRootN; i <= index; i++) {
    if (arr[i]) {
      return i;
    }
  }
};
