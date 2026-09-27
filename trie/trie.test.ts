import { describe, expect, it } from "vitest";

import { Trie } from "./trie.ts";

describe("Trie", () => {
  it("starts with an empty root", () => {
    const trie = new Trie();

    expect(trie.root.value).toBe("");
    expect(trie.root.children.size).toBe(0);
    expect(trie.find("missing")).toBe(false);
  });

  it("inserts a word and marks only its final node as a word", () => {
    const trie = new Trie();

    trie.insert("cat");

    expect(trie.find("cat")).toBe(true);
    expect(trie.find("ca")).toBe(false);
    expect(trie.find("c")).toBe(false);
    expect(trie.find("cats")).toBe(false);
  });

  it("shares nodes for words with a common prefix", () => {
    const trie = new Trie();

    trie.insert("car");
    trie.insert("cat");

    expect(trie.find("car")).toBe(true);
    expect(trie.find("cat")).toBe(true);
    expect(trie.find("ca")).toBe(false);

    expect(trie.root.children.size).toBe(1);
    expect(trie.root.children.get("c")?.children.size).toBe(1);
    expect(trie.root.children.get("c")?.children.get("a")?.children.size).toBe(
      2,
    );
  });

  it("keeps a shorter word valid when a longer word is inserted", () => {
    const trie = new Trie();

    trie.insert("car");
    trie.insert("carpet");

    expect(trie.find("car")).toBe(true);
    expect(trie.find("carpet")).toBe(true);
    expect(trie.find("carp")).toBe(false);
  });

  it("handles duplicate insertions without changing the trie structure", () => {
    const trie = new Trie();

    trie.insert("hello");
    const rootChildren = trie.root.children.size;

    trie.insert("hello");

    expect(trie.find("hello")).toBe(true);
    expect(trie.root.children.size).toBe(rootChildren);
  });

  it("finds existing nodes by character", () => {
    const trie = new Trie();

    trie.insert("cat");
    trie.insert("dog");
    expect(trie.findNode("c")).toMatchObject({ value: "c" });
    expect(trie.findNode("a")).toMatchObject({ value: "a" });
    expect(trie.findNode("g")).toMatchObject({ value: "g" });
  });

  it("returns false when findNode cannot find a character", () => {
    const trie = new Trie();

    trie.insert("cat");

    expect(trie.findNode("z")).toBe(false);
  });

  it("supports the empty word", () => {
    const trie = new Trie();

    trie.insert("");

    expect(trie.find("")).toBe(true);
    expect(trie.find("a")).toBe(false);
  });

  it("returns all complete words matching a prefix", () => {
    const trie = new Trie();

    trie.insert("cat");
    trie.insert("car");
    trie.insert("carpet");
    trie.insert("dog");

    expect(trie.autocomplete("ca")).toEqual(["car", "carpet", "cat"]);
  });

  it("includes the prefix when it is also a complete word", () => {
    const trie = new Trie();

    trie.insert("car");
    trie.insert("cart");

    expect(trie.autocomplete("car")).toEqual(["car", "cart"]);
  });

  it("returns every word for an empty prefix", () => {
    const trie = new Trie();

    trie.insert("banana");
    trie.insert("apple");
    trie.insert("app");

    expect(trie.autocomplete("")).toEqual(["app", "apple", "banana"]);
  });

  it("returns an empty array when no word matches the prefix", () => {
    const trie = new Trie();

    trie.insert("cat");

    expect(trie.autocomplete("do")).toEqual([]);
  });
});
