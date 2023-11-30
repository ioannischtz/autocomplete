import { Suggestion, Trie } from "./trie";
import { ActionType, UserActions } from "./userActions";

export default class AutoComplete {
  trie: Trie;
  user_actions: UserActions;
  word_priorities: Map<string, number>;

  constructor() {
    this.trie = new Trie();
    this.user_actions = new UserActions();
    this.word_priorities = new Map<string, number>();
  }

  updatePriority(word: string, action_type: ActionType): void {
    const current_prio = this.word_priorities.get(word) || 0;
    const new_prio = this.user_actions.calculatePriority(
      current_prio,
      action_type,
    );
    this.word_priorities.set(word, new_prio);
    this.trie.insert(word, new_prio);
  }

  getSuggestions(prefix: string, max_suggestions = 5): Suggestion[] {
    return this.trie.retrieveSuggestions(prefix, max_suggestions);
  }
}
