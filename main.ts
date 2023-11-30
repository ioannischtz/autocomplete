import AutoComplete from "./autocomplete";
import { action_types } from "./userActions";

const autocomplete = new AutoComplete();

// Simulate user actions
autocomplete.updatePriority("coding", action_types.SELECT);
autocomplete.updatePriority("programming", action_types.SELECT);
autocomplete.updatePriority("java", action_types.DISMISS);

// Function to print suggestions for a prefix
const printSuggestions = (prefix: string) => {
  const suggestions = autocomplete.getSuggestions(prefix, 5);
  console.log(`Suggestions for "${prefix}":`, suggestions);
};

// Print suggestions after each new character
printSuggestions("c");
printSuggestions("co");
printSuggestions("cod");
