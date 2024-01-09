
export function capitalize(word) {
  if (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
  return word;
}

export function lowerCase(word) {
  if (word) {
    return word.toLowerCase();
  }
  return word;
}

