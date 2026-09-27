interface TrieNode {
  value: string;
  children: Map<string, TrieNode>;
  isWord: boolean;
}

export class Trie {
  root: TrieNode;
  constructor() {
    this.root = {
      value: "",
      children: new Map(),
      isWord: false,
    };
  }
  insert(word: string) {
    let current = this.root;
    for (const c of word) {
      if (!current.children.has(c)) {
        current.children.set(c, {
          value: c,
          children: new Map(),
          isWord: false,
        });
      }
      current = current.children.get(c)!;
    }
    current.isWord = true;
  }
  find(word: string) {
    let current = this.root;
    for (const c of word) {
      if (!current.children.has(c)) {
        return false;
      }
      current = current.children.get(c)!;
    }
    return current.isWord;
  }

  autocomplete(prefix: string): string[] {
    let current = this.root;

    for (const c of prefix) {
      if (!current.children.has(c)) {
        return [];
      }

      current = current.children.get(c)!;
    }

    const words: string[] = [];

    const collectWords = (node: TrieNode, word: string): void => {
      if (node.isWord) {
        words.push(word);
      }

      for (const [character, child] of node.children) {
        collectWords(child, word + character);
      }
    };

    collectWords(current, prefix);
    return words.sort();
  }

  findNode(c: string): TrieNode | false {
    const queue: TrieNode[] = [this.root];

    while (queue.length > 0) {
      const current = queue.shift()!;

      if (current !== this.root && current.value === c) {
        return current;
      }

      for (const node of current.children.values()) {
        queue.push(node);
      }
    }

    return false;
  }
}
