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

export const compareTrees = <T>(
  root1: BinaryNode<T> | undefined,
  root2: BinaryNode<T> | undefined,
): boolean => {
  if (root1 === root2) return true;
  if (root1?.value !== root2?.value) return false;
  return (
    compareTrees(root1?.left, root2?.left) &&
    compareTrees(root1?.right, root2?.right)
  );
};

export const bfs = <T>(root: BinaryNode<T> | undefined, target: T): boolean => {
  const queue = [];
  if (!root) return false;
  queue.push(root);
  while (queue.length) {
    const node = queue.shift();
    if (node?.value === target) {
      return true;
    }
    if (node?.left) queue.push(node.left);
    if (node?.right) queue.push(node.right);
  }
  return false;
};

export const dfs = <T>(root: BinaryNode<T> | undefined, target: T): boolean => {
  if (!root) return false;

  const stack: { node: BinaryNode<T>; expanded: boolean }[] = [
    { node: root, expanded: false },
  ];
  let found = false;

  while (stack.length > 0) {
    const { node, expanded } = stack.pop()!;

    if (expanded) {
      // Check each node after its children: leaves first, root last.
      if (node.value === target) found = true;
      continue;
    }

    stack.push({ node, expanded: true });
    if (node.right) stack.push({ node: node.right, expanded: false });
    if (node.left) stack.push({ node: node.left, expanded: false });
  }

  return found;
};
