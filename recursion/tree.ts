type BinaryNode<T> = {
  value: T;
  left: BinaryNode<T> | undefined;
  right: BinaryNode<T> | undefined;
};

export const preorderSearch = <T>(
  root: BinaryNode<T> | undefined,
  target: T,
): boolean => {
  if (!root) {
    return false;
  }
  if (root.value === target) {
    return true;
  }
  return (
    preorderSearch(root.left, target) || preorderSearch(root.right, target)
  );
};

export const postOrderSearch = <T>(
  root: BinaryNode<T> | undefined,
  target: T,
): boolean => {
  if (!root) return false;
  return (
    postOrderSearch(root.left, target) ||
    postOrderSearch(root.right, target) ||
    root.value === target
  );
};

export const inOrderSearch = <T>(
  root: BinaryNode<T> | undefined,
  target: T,
): boolean => {
  if (!root) return false;
  return (
    inOrderSearch(root.left, target) ||
    root.value === target ||
    inOrderSearch(root.right, target)
  );
};

export const treeHeight = <T>(root: BinaryNode<T> | undefined): number => {
  if (!root) return 0;
  return 1 + Math.max(treeHeight(root.left), treeHeight(root.right));
};

export const countNodes = <T>(root: BinaryNode<T> | undefined): number => {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
};

export const isBalanced = <T>(root: BinaryNode<T> | undefined): boolean => {
  if (!root) return true;
  return treeHeight(root.left) === treeHeight(root.right);
};

export const invertTree = <T>(
  root: BinaryNode<T> | undefined,
): BinaryNode<T> | undefined => {
  if (!root) return undefined;

  return {
    value: root.value,
    left: invertTree(root.right),
    right: invertTree(root.left),
  };
};
