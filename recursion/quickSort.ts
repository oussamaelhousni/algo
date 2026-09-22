export const quickSort = <T>(arr: T[]) => {
  partition(arr, 0, arr.length - 1);
};

const partition = <T>(arr: T[], low: number, high: number) => {
  if (low >= high) return;
  const pivotIndex = Math.floor(low + Math.random() * (high - low + 1));
  const pivot = arr[pivotIndex];
  // swap the pivot with last element
  let temp = arr[high];
  arr[high] = arr[pivotIndex];
  arr[pivotIndex] = temp;
  let storeIdx = low;
  for (let i = low; i < high; i++) {
    if (pivot >= arr[i]) {
      const temp = arr[i];
      arr[i] = arr[storeIdx];
      arr[storeIdx] = temp;
      storeIdx++;
    }
  }
  temp = arr[storeIdx];
  arr[storeIdx] = arr[high];
  arr[high] = temp;
  partition(arr, low, storeIdx - 1);
  partition(arr, storeIdx + 1, high);
};
