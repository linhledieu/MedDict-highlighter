
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

export function trimSpaces(str) {
  return str.replace(/\s+/g, ' ').trim();
}

export function caCase(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export function snaCase(str) {
  return str.toLowerCase().replace(/\s+/g, '_');
}

export function keCase(str) {
  return str.toLowerCase().replace(/\s+/g, '-');
}

export function reverseString(str) {
  return str.split('').reverse().join('');
}

export function isPalindrome(str) {
  const cleanStr = str.replace(/\W/g, '').toLowerCase();
  return cleanStr === reverseString(cleanStr);
}

export function wordCount(str) {
  return str.trim().split(/\s+/).length;
}

export function randomString(length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}