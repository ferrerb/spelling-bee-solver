// TODO: name this better... word-matcher blah
const findWords = (requiredChar, optionalChar, trie, minLength = 4) => {
  const matches = trie.findMatches(requiredChar, optionalChar);

  return matches
    .filter(m => m.length >= minLength)
    .sort()
    .map(m => formatMatch(m, [requiredChar, ...optionalChar]));
};

module.exports = { findWords };

const formatMatch = (match, possibleChars) => {
  const isPangram = possibleChars.every(p => match.indexOf(p) !== -1);

  return {
    word: match,
    isPangram
  };
};