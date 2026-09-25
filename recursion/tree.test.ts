import { describe, expect, it } from "vitest";

import {
  bfs,
  countNodes,
  dfs,
  compareTrees,
  deleteAVL,
  invertTree,
  insertAVL,
  insertBST,
  isBalanced,
  preorderSearch,
  removeBST,
  rotateLeft,
  rotateRight,
  treeHeight,
  updateBST,
  updateAVL,
} from "./tree.ts";

describe("preorderSearch", () => {
  it("returns false for an empty tree", () => {
    expect(preorderSearch(undefined, 1)).toBe(false);
  });

  it("finds a value at the root", () => {
    const tree = {
      value: 10,
      left: undefined,
      right: undefined,
    };

    expect(preorderSearch(tree, 10)).toBe(true);
  });

  it("finds values in the left and right subtrees", () => {
    const tree = {
      value: 10,
      left: {
        value: 5,
        left: undefined,
        right: undefined,
      },
      right: {
        value: 15,
        left: undefined,
        right: undefined,
      },
    };

    expect(preorderSearch(tree, 5)).toBe(true);
    expect(preorderSearch(tree, 15)).toBe(true);
  });

  it("returns false when the target is not in the tree", () => {
    const tree = {
      value: 10,
      left: {
        value: 5,
        left: undefined,
        right: undefined,
      },
      right: undefined,
    };

    expect(preorderSearch(tree, 99)).toBe(false);
  });

  it("works with generic value types", () => {
    const tree = {
      value: "root",
      left: {
        value: "left",
        left: undefined,
        right: undefined,
      },
      right: undefined,
    };

    expect(preorderSearch(tree, "left")).toBe(true);
    expect(preorderSearch(tree, "missing")).toBe(false);
  });
});

describe("treeHeight", () => {
  it("returns 0 for an empty tree", () => {
    expect(treeHeight(undefined)).toBe(0);
  });

  it("returns 1 for a tree with one node", () => {
    const tree = {
      value: 10,
      left: undefined,
      right: undefined,
    };

    expect(treeHeight(tree)).toBe(1);
  });

  it("returns the height of a balanced tree", () => {
    const tree = {
      value: 10,
      left: {
        value: 5,
        left: { value: 2, left: undefined, right: undefined },
        right: { value: 7, left: undefined, right: undefined },
      },
      right: {
        value: 15,
        left: { value: 12, left: undefined, right: undefined },
        right: { value: 20, left: undefined, right: undefined },
      },
    };

    expect(treeHeight(tree)).toBe(3);
  });

  it("uses the longest path in an uneven tree", () => {
    const tree = {
      value: 10,
      left: {
        value: 5,
        left: {
          value: 2,
          left: { value: 1, left: undefined, right: undefined },
          right: undefined,
        },
        right: undefined,
      },
      right: { value: 15, left: undefined, right: undefined },
    };

    expect(treeHeight(tree)).toBe(4);
  });
});

describe("countNodes", () => {
  it("returns 0 for an empty tree", () => {
    expect(countNodes(undefined)).toBe(0);
  });

  it("returns 1 for a tree with one node", () => {
    const tree = {
      value: 10,
      left: undefined,
      right: undefined,
    };

    expect(countNodes(tree)).toBe(1);
  });

  it("counts every node in the tree", () => {
    const tree = {
      value: 10,
      left: {
        value: 5,
        left: { value: 2, left: undefined, right: undefined },
        right: { value: 7, left: undefined, right: undefined },
      },
      right: {
        value: 15,
        left: undefined,
        right: { value: 20, left: undefined, right: undefined },
      },
    };

    expect(countNodes(tree)).toBe(6);
  });
});

describe("isBalanced", () => {
  it("returns true for an empty tree", () => {
    expect(isBalanced(undefined)).toBe(true);
  });

  it("returns true for a tree with one node", () => {
    const tree = {
      value: 10,
      left: undefined,
      right: undefined,
    };

    expect(isBalanced(tree)).toBe(true);
  });

  it("returns true when the left and right subtree heights are balanced", () => {
    const tree = {
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: { value: 15, left: undefined, right: undefined },
    };

    expect(isBalanced(tree)).toBe(true);
  });

  it("returns false when one subtree is more than one level deeper", () => {
    const tree = {
      value: 10,
      left: {
        value: 5,
        left: {
          value: 2,
          left: { value: 1, left: undefined, right: undefined },
          right: undefined,
        },
        right: undefined,
      },
      right: { value: 15, left: undefined, right: undefined },
    };

    expect(isBalanced(tree)).toBe(false);
  });
});

describe("invertTree", () => {
  it("returns undefined for an empty tree", () => {
    expect(invertTree(undefined)).toBeUndefined();
  });

  it("keeps a leaf node unchanged", () => {
    const tree = {
      value: 1,
      left: undefined,
      right: undefined,
    };

    const inverted = invertTree(tree);

    expect(inverted).toEqual({
      value: 1,
      left: undefined,
      right: undefined,
    });
    expect(inverted).not.toBe(tree);
  });

  it("swaps every left and right subtree recursively", () => {
    const tree = {
      value: 1,
      left: {
        value: 2,
        left: { value: 4, left: undefined, right: undefined },
        right: { value: 5, left: undefined, right: undefined },
      },
      right: {
        value: 3,
        left: { value: 6, left: undefined, right: undefined },
        right: {
          value: 7,
          left: { value: 8, left: undefined, right: undefined },
          right: undefined,
        },
      },
    };

    const inverted = invertTree(tree);

    expect(inverted).toEqual({
      value: 1,
      left: {
        value: 3,
        left: {
          value: 7,
          left: undefined,
          right: { value: 8, left: undefined, right: undefined },
        },
        right: { value: 6, left: undefined, right: undefined },
      },
      right: {
        value: 2,
        left: { value: 5, left: undefined, right: undefined },
        right: { value: 4, left: undefined, right: undefined },
      },
    });

    expect(tree).toEqual({
      value: 1,
      left: {
        value: 2,
        left: { value: 4, left: undefined, right: undefined },
        right: { value: 5, left: undefined, right: undefined },
      },
      right: {
        value: 3,
        left: { value: 6, left: undefined, right: undefined },
        right: {
          value: 7,
          left: { value: 8, left: undefined, right: undefined },
          right: undefined,
        },
      },
    });
  });

  it("returns the inverted root", () => {
    const tree = {
      value: 1,
      left: { value: 2, left: undefined, right: undefined },
      right: { value: 3, left: undefined, right: undefined },
    };

    const inverted = invertTree(tree);

    expect(inverted).not.toBe(tree);
    expect(inverted).toEqual({
      value: 1,
      left: { value: 3, left: undefined, right: undefined },
      right: { value: 2, left: undefined, right: undefined },
    });
  });
});

describe("compareTrees", () => {
  it("returns true when both trees are empty", () => {
    expect(compareTrees(undefined, undefined)).toBe(true);
  });

  it("returns true for the same tree reference", () => {
    const tree = {
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: undefined,
    };

    expect(compareTrees(tree, tree)).toBe(true);
  });

  it("returns true for separate trees with the same values and structure", () => {
    const firstTree = {
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: { value: 15, left: undefined, right: undefined },
    };
    const secondTree = {
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: { value: 15, left: undefined, right: undefined },
    };

    expect(compareTrees(firstTree, secondTree)).toBe(true);
  });

  it("returns false when node values differ", () => {
    const firstTree = { value: 10, left: undefined, right: undefined };
    const secondTree = { value: 20, left: undefined, right: undefined };

    expect(compareTrees(firstTree, secondTree)).toBe(false);
  });

  it("returns false when tree structure differs", () => {
    const firstTree = {
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: undefined,
    };
    const secondTree = {
      value: 10,
      left: undefined,
      right: { value: 5, left: undefined, right: undefined },
    };

    expect(compareTrees(firstTree, secondTree)).toBe(false);
  });

  it("returns false when only one tree is empty", () => {
    const tree = { value: 10, left: undefined, right: undefined };

    expect(compareTrees(tree, undefined)).toBe(false);
    expect(compareTrees(undefined, tree)).toBe(false);
  });
});

describe("bfs", () => {
  it("returns false for an empty tree", () => {
    expect(bfs(undefined, 1)).toBe(false);
  });

  it("finds a value at the root", () => {
    const tree = {
      value: 10,
      left: undefined,
      right: undefined,
    };

    expect(bfs(tree, 10)).toBe(true);
  });

  it("finds values in both subtrees", () => {
    const tree = {
      value: 10,
      left: {
        value: 5,
        left: { value: 2, left: undefined, right: undefined },
        right: { value: 7, left: undefined, right: undefined },
      },
      right: {
        value: 15,
        left: { value: 12, left: undefined, right: undefined },
        right: { value: 20, left: undefined, right: undefined },
      },
    };

    expect(bfs(tree, 2)).toBe(true);
    expect(bfs(tree, 20)).toBe(true);
  });

  it("returns false when the target is not in the tree", () => {
    const tree = {
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: { value: 15, left: undefined, right: undefined },
    };

    expect(bfs(tree, 99)).toBe(false);
  });

  it("works with generic value types", () => {
    const tree = {
      value: "root",
      left: { value: "left", left: undefined, right: undefined },
      right: undefined,
    };

    expect(bfs(tree, "left")).toBe(true);
    expect(bfs(tree, "missing")).toBe(false);
  });
});

describe("dfs", () => {
  it("returns false for an empty tree", () => {
    expect(dfs(undefined, 1)).toBe(false);
  });

  it("finds the root and values in both subtrees", () => {
    const tree = {
      value: 10,
      left: {
        value: 5,
        left: { value: 2, left: undefined, right: undefined },
        right: { value: 7, left: undefined, right: undefined },
      },
      right: {
        value: 15,
        left: { value: 12, left: undefined, right: undefined },
        right: { value: 20, left: undefined, right: undefined },
      },
    };

    expect(dfs(tree, 10)).toBe(true);
    expect(dfs(tree, 2)).toBe(true);
    expect(dfs(tree, 20)).toBe(true);
  });

  it("checks deepest levels before moving up to the root", () => {
    const tree = {
      value: "A",
      left: {
        value: "B",
        left: { value: "D", left: undefined, right: undefined },
        right: {
          value: "E",
          left: { value: "G", left: undefined, right: undefined },
          right: undefined,
        },
      },
      right: {
        value: "C",
        left: undefined,
        right: { value: "F", left: undefined, right: undefined },
      },
    };

    expect(dfs(tree, "A")).toBe(true);
  });

  it("returns false when the target is not in the tree", () => {
    const tree = {
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: { value: 15, left: undefined, right: undefined },
    };

    expect(dfs(tree, 99)).toBe(false);
  });

  it("works with generic value types", () => {
    const tree = {
      value: "root",
      left: { value: "left", left: undefined, right: undefined },
      right: undefined,
    };

    expect(dfs(tree, "left")).toBe(true);
    expect(dfs(tree, "missing")).toBe(false);
  });
});

describe("insertBST", () => {
  it("creates and returns a root when the tree is empty", () => {
    expect(insertBST(undefined, 10)).toEqual({
      value: 10,
      left: undefined,
      right: undefined,
    });
  });

  it("inserts smaller or equal values into the left subtree", () => {
    const tree = {
      value: 10,
      left: undefined,
      right: undefined,
    };

    insertBST(tree, 5);

    expect(tree).toEqual({
      value: 10,
      left: { value: 5 },
      right: undefined,
    });
  });

  it("inserts duplicate values into the left subtree", () => {
    const tree = {
      value: 10,
      left: undefined,
      right: undefined,
    };

    insertBST(tree, 10);

    expect(tree).toEqual({
      value: 10,
      left: { value: 10 },
      right: undefined,
    });
  });

  it("inserts larger values into the right subtree", () => {
    const tree = {
      value: 10,
      left: undefined,
      right: undefined,
    };

    insertBST(tree, 15);

    expect(tree).toEqual({
      value: 10,
      left: undefined,
      right: { value: 15 },
    });
  });

  it("traverses the tree before inserting at the correct leaf", () => {
    const tree = {
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: { value: 15, left: undefined, right: undefined },
    };

    insertBST(tree, 7);
    insertBST(tree, 20);

    expect(tree).toEqual({
      value: 10,
      left: {
        value: 5,
        left: undefined,
        right: { value: 7 },
      },
      right: {
        value: 15,
        left: undefined,
        right: { value: 20 },
      },
    });
  });
});

describe("removeBST", () => {
  it("returns undefined when the tree is empty", () => {
    expect(removeBST(undefined, 10)).toBeUndefined();
  });

  it("removes a leaf from the left subtree", () => {
    const tree = {
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: { value: 15, left: undefined, right: undefined },
    };

    const updatedTree = removeBST(tree, 5);

    expect(updatedTree).toEqual({
      value: 10,
      left: undefined,
      right: { value: 15, left: undefined, right: undefined },
    });
  });

  it("replaces a removed node with its only child", () => {
    const tree = {
      value: 10,
      left: {
        value: 5,
        left: { value: 2, left: undefined, right: undefined },
        right: undefined,
      },
      right: undefined,
    };

    const updatedTree = removeBST(tree, 5);

    expect(updatedTree).toEqual({
      value: 10,
      left: { value: 2, left: undefined, right: undefined },
      right: undefined,
    });
  });

  it("removes the root and returns its right child when it has no left child", () => {
    const tree = {
      value: 10,
      left: undefined,
      right: { value: 15, left: undefined, right: undefined },
    };

    const updatedTree = removeBST(tree, 10);

    expect(updatedTree).toEqual({
      value: 15,
      left: undefined,
      right: undefined,
    });
  });

  it("searches the right subtree before removing a value", () => {
    const tree = {
      value: 10,
      left: undefined,
      right: {
        value: 15,
        left: { value: 12, left: undefined, right: undefined },
        right: undefined,
      },
    };

    const updatedTree = removeBST(tree, 12);

    expect(updatedTree).toEqual({
      value: 10,
      left: undefined,
      right: {
        value: 15,
        left: undefined,
        right: undefined,
      },
    });
  });

  it("removes one duplicate while preserving the other duplicate", () => {
    const tree = {
      value: 10,
      left: { value: 10, left: undefined, right: undefined },
      right: { value: 15, left: undefined, right: undefined },
    };

    const updatedTree = removeBST(tree, 10);

    expect(updatedTree).toEqual({
      value: 15,
      left: { value: 10, left: undefined, right: undefined },
      right: undefined,
    });
  });

  it("replaces a node with two children using its in-order successor", () => {
    const tree = {
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: {
        value: 15,
        left: { value: 12, left: undefined, right: undefined },
        right: { value: 20, left: undefined, right: undefined },
      },
    };

    const updatedTree = removeBST(tree, 10);

    expect(updatedTree).toEqual({
      value: 12,
      left: { value: 5, left: undefined, right: undefined },
      right: {
        value: 15,
        left: undefined,
        right: { value: 20, left: undefined, right: undefined },
      },
    });
  });
});

describe("updateBST", () => {
  it("updates a node while preserving BST ordering", () => {
    const tree = {
      value: 10,
      left: {
        value: 5,
        left: undefined,
        right: { value: 7, left: undefined, right: undefined },
      },
      right: { value: 15, left: undefined, right: undefined },
    };

    const updatedTree = updateBST(tree, 5, 12);

    expect(updatedTree).toEqual({
      value: 10,
      left: { value: 7, left: undefined, right: undefined },
      right: {
        value: 15,
        left: { value: 12, left: undefined, right: undefined },
        right: undefined,
      },
    });
  });

  it("returns the original tree when the target is missing", () => {
    const tree = {
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: { value: 15, left: undefined, right: undefined },
    };

    expect(updateBST(tree, 99, 12)).toBe(tree);
    expect(tree).toEqual({
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: { value: 15, left: undefined, right: undefined },
    });
  });

  it("does not change the tree when the replacement is equal to the target", () => {
    const tree = {
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: { value: 15, left: undefined, right: undefined },
    };

    expect(updateBST(tree, 5, 5)).toBe(tree);
    expect(tree.left?.value).toBe(5);
  });
});

describe("updateAVL", () => {
  it("updates a node and preserves AVL ordering and balance", () => {
    let tree = insertAVL(undefined, 20);
    for (const value of [10, 30, 5, 15, 25, 35]) {
      tree = insertAVL(tree, value);
    }

    const updatedTree = updateAVL(tree, 5, 27);

    expect(updatedTree).toMatchObject({
      value: 20,
      left: {
        value: 10,
        right: { value: 15 },
      },
      right: {
        value: 30,
        left: {
          value: 25,
          right: { value: 27 },
        },
        right: { value: 35 },
      },
    });
    expect(treeHeight(updatedTree)).toBe(4);
  });

  it("keeps the tree balanced after a replacement on the right side", () => {
    let tree = insertAVL(undefined, 20);
    for (const value of [10, 30, 5, 15, 25, 35]) {
      tree = insertAVL(tree, value);
    }

    const updatedTree = updateAVL(tree, 5, 40);

    expect(updatedTree).toMatchObject({
      value: 20,
      left: { value: 10, right: { value: 15 } },
      right: {
        value: 30,
        left: { value: 25 },
        right: {
          value: 35,
          right: { value: 40 },
        },
      },
    });
    expect(treeHeight(updatedTree)).toBe(4);
  });

  it("returns the original tree when the target is missing", () => {
    const tree = insertAVL(undefined, 10);

    expect(updateAVL(tree, 99, 12)).toBe(tree);
  });
});

describe("tree rotations", () => {
  it("rotates a tree left and returns the new root", () => {
    const root = {
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: {
        value: 15,
        left: { value: 12, left: undefined, right: undefined },
        right: { value: 20, left: undefined, right: undefined },
      },
    };
    const pivot = root.right;

    const newRoot = rotateLeft(root);

    expect(newRoot).toEqual({
      value: 15,
      left: {
        value: 10,
        left: { value: 5, left: undefined, right: undefined },
        right: { value: 12, left: undefined, right: undefined },
      },
      right: { value: 20, left: undefined, right: undefined },
    });
    expect(newRoot).toBe(pivot);
  });

  it("rotates a tree right and returns the new root", () => {
    const root = {
      value: 10,
      left: {
        value: 5,
        left: { value: 2, left: undefined, right: undefined },
        right: { value: 7, left: undefined, right: undefined },
      },
      right: { value: 15, left: undefined, right: undefined },
    };
    const pivot = root.left;

    const newRoot = rotateRight(root);

    expect(newRoot).toEqual({
      value: 5,
      left: { value: 2, left: undefined, right: undefined },
      right: {
        value: 10,
        left: { value: 7, left: undefined, right: undefined },
        right: { value: 15, left: undefined, right: undefined },
      },
    });
    expect(newRoot).toBe(pivot);
  });
});

describe("insertAVL", () => {
  it("creates a root when the tree is empty", () => {
    expect(insertAVL(undefined, 10)).toMatchObject({ value: 10 });
  });

  it.each([
    {
      name: "left-left insertion",
      values: [30, 20, 10],
      expected: {
        value: 20,
        left: { value: 10 },
        right: { value: 30 },
      },
    },
    {
      name: "right-right insertion",
      values: [10, 20, 30],
      expected: {
        value: 20,
        left: { value: 10 },
        right: { value: 30 },
      },
    },
    {
      name: "left-right insertion",
      values: [30, 10, 20],
      expected: {
        value: 20,
        left: { value: 10 },
        right: { value: 30 },
      },
    },
    {
      name: "right-left insertion",
      values: [10, 30, 20],
      expected: {
        value: 20,
        left: { value: 10 },
        right: { value: 30 },
      },
    },
  ])("balances the tree after $name", ({ values, expected }) => {
    let root = insertAVL(undefined, values[0]);

    for (const value of values.slice(1)) {
      root = insertAVL(root, value);
    }

    expect(root).toMatchObject(expected);
    expect(treeHeight(root)).toBe(2);
  });
});

describe("deleteAVL", () => {
  it("returns undefined for an empty tree", () => {
    expect(deleteAVL(undefined, 10)).toBeUndefined();
  });

  it("does not change the tree when the target is absent", () => {
    const tree = {
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: { value: 15, left: undefined, right: undefined },
    };

    expect(deleteAVL(tree, 99)).toEqual(tree);
  });

  it("removes a leaf node", () => {
    const tree = {
      value: 10,
      left: { value: 5, left: undefined, right: undefined },
      right: { value: 15, left: undefined, right: undefined },
    };

    expect(deleteAVL(tree, 5)).toMatchObject({
      value: 10,
      left: undefined,
      right: { value: 15 },
    });
  });

  it("replaces a node with two children using its in-order successor", () => {
    const tree = {
      value: 20,
      left: { value: 10, left: undefined, right: undefined },
      right: {
        value: 30,
        left: { value: 25, left: undefined, right: undefined },
        right: { value: 40, left: undefined, right: undefined },
      },
    };

    expect(deleteAVL(tree, 20)).toMatchObject({
      value: 25,
      left: { value: 10 },
      right: {
        value: 30,
        left: undefined,
        right: { value: 40 },
      },
    });
  });

  it("rebalances the tree after deletion", () => {
    const tree = {
      value: 30,
      left: {
        value: 20,
        left: {
          value: 10,
          left: { value: 5, left: undefined, right: undefined },
          right: undefined,
        },
        right: { value: 25, left: undefined, right: undefined },
      },
      right: {
        value: 40,
        left: undefined,
        right: { value: 50, left: undefined, right: undefined },
      },
    };

    const updatedTree = deleteAVL(tree, 50);

    expect(updatedTree).toMatchObject({
      value: 20,
      left: {
        value: 10,
        left: { value: 5 },
        right: undefined,
      },
      right: {
        value: 30,
        left: { value: 25 },
        right: { value: 40 },
      },
    });
    expect(treeHeight(updatedTree)).toBe(3);
  });
});
