class TrieNode {
  char: string;
  prio: number;
  children: Map<string, TrieNode>;

  constructor(char: string) {
    this.char = char;
    this.prio = 0; // prio = 0 | The path up to this char, is not a complete word.
    this.children = new Map<string, TrieNode>();
  }
}

export type Suggestion = {
  word: string;
  priority: number;
};

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode("");
  }

  insert(word: string, priority: number): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode(char));
      }
      node = node.children.get(char)!;
    }
    node.prio = priority;
  }

  retrieveSuggestions(prefix: string, max_suggestions = 5): Suggestion[] {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char)!;
    }

    const suggestions: Suggestion[] = [];
    this.traverse(node, "", suggestions, max_suggestions);

    return suggestions;
  }

  private traverse(
    node: TrieNode,
    current_word: string,
    suggestions: Suggestion[],
    max_suggestions: number,
  ): void {
    if (suggestions.length >= max_suggestions) {
      return; // Stop traversal if we already have enough suggestions
    }

    if (node.prio > 0) {
      suggestions.push({ word: current_word, priority: node.prio });
    }

    // Sort children based on priority before traversal

    const sorted_children = Array.from(node.children.entries()).sort(
      (a, b) => b[1].prio - a[1].prio,
    );

    for (const [char, child] of sorted_children) {
      this.traverse(child, current_word + char, suggestions, max_suggestions);
    }
  }
}

export { Trie, TrieNode };
