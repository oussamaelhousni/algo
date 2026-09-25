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

export const insertBST = <T>(
  root: BinaryNode<T> | undefined,
  item: T,
): BinaryNode<T> => {
  if (!root) {
    return { value: item, left: undefined, right: undefined };
  }

  if (root.value >= item) {
    root.left = insertBST(root.left, item);
  } else {
    root.right = insertBST(root.right, item);
  }

  return root;
};

export const removeBST = <T>(
  root: BinaryNode<T> | undefined,
  target: T,
): BinaryNode<T> | undefined => {
  if (!root) return;
  if (root.value > target) {
    root.left = removeBST(root.left, target);
    return root;
  }
  if (root.value < target) {
    root.right = removeBST(root.right, target);
    return root;
  }
  if (!root.right) {
    return root.left;
  }
  if (!root.left) {
    return root.right;
  }
  let current = root.right;
  while (current.left) {
    current = current.left;
  }

  root.value = current.value;

  root.right = removeBST(root.right, current.value);
  return root;
};

export const updateBST = <T>(
  root: BinaryNode<T> | undefined,
  target: T,
  replacement: T,
): BinaryNode<T> | undefined => {
  if (!root) return;

  let current: BinaryNode<T> | undefined = root;
  while (current) {
    if (current.value === target) {
      if (target === replacement) return root;
      return insertBST(removeBST(root, target), replacement);
    }
    current = current.value > target ? current.left : current.right;
  }

  return root;
};
export const rotateLeft = <T>(root: BinaryNode<T>) => {
  const newRoot = root.right!;
  root.right = newRoot.left;
  newRoot.left = root;
  return newRoot;
};
export const rotateRight = <T>(root: BinaryNode<T>) => {
  const newRoot = root.left!;
  root.left = newRoot.right;
  newRoot!.right = root;
  return newRoot;
};
export const insertAVL = <T>(root: BinaryNode<T> | undefined, item: T) => {
  if (!root) return { value: item } as BinaryNode<T>;
  if (root.value > item) {
    root.left = insertAVL(root.left, item);
  }
  if (root.value < item) {
    root.right = insertAVL(root.right, item);
  }
  const balance = treeHeight(root.left) - treeHeight(root.right);
  if (balance > 1) {
    if (root.left && root.left.value < item) {
      root.left = rotateLeft(root.left);
    }
    return rotateRight(root);
  } else if (balance < -1) {
    if (root.right && root.right.value > item) {
      root.right = rotateRight(root.right);
    }
    return rotateLeft(root);
  }
  return root;
};
export const deleteAVL = <T>(
  root: BinaryNode<T> | undefined,
  target: T,
): BinaryNode<T> | undefined => {
  if (!root) return;

  if (root.value > target) {
    root.left = deleteAVL(root.left, target);
  } else if (root.value < target) {
    root.right = deleteAVL(root.right, target);
  } else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    let successor = root.right;
    while (successor.left) {
      successor = successor.left;
    }

    root.value = successor.value;
    root.right = deleteAVL(root.right, successor.value);
  }

  const balance = treeHeight(root.left) - treeHeight(root.right);

  if (balance > 1) {
    if (root.left && treeHeight(root.left.left) < treeHeight(root.left.right)) {
      root.left = rotateLeft(root.left);
    }
    return rotateRight(root);
  }

  if (balance < -1) {
    if (
      root.right &&
      treeHeight(root.right.right) < treeHeight(root.right.left)
    ) {
      root.right = rotateRight(root.right);
    }
    return rotateLeft(root);
  }

  return root;
};
export const updateAVL = <T>(
  root: BinaryNode<T> | undefined,
  target: T,
  replacement: T,
): BinaryNode<T> | undefined => {
  if (!root) return;

  let current: BinaryNode<T> | undefined = root;

  while (current) {
    if (current.value === target) {
      if (target === replacement) return root;
      return insertAVL(deleteAVL(root, target), replacement);
    }

    current = current.value > target ? current.left : current.right;
  }

  return root;
};
