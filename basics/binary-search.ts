export const binarySeach = (
  arr: number[],
  value: number,
): number | undefined => {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] === value) {
      return mid;
    } else if (arr[mid] > value) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
};
