import { describe, expect, it } from "vitest";

import {
  countNodes,
  invertTree,
  isBalanced,
  preorderSearch,
  treeHeight,
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
