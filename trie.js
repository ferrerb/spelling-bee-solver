const { validate } = require("@babel/types");
const { option } = require("yargs");

function Trie() {
  this.head = createNode();
}

Trie.prototype.insert = function (word) {
  validateString(word);

  let node = this.head;

  // Move through the characters in the word
  word.split('').forEach((c, i) => {
    // If the character isn't present as a child node, add it
    if (!node.children[c]) {
      node.children[c] = createNode();
    }

    // Set the current node to the one matching the current character
    node = node.children[c];
  });

  // Once we are at the end of the char list, set the node to complete and add the word
  node.value = word;
  node.isWord = true;
};

Trie.prototype.find = function (word = '') {
  validateString(word);

  let node = this.head;

  word.split('').forEach(c => {
    if (node.children[c]) {
      node = node.children[c];
    }
  });

  // IF this is an actual word, return the value; otherwise nothing
  return node.isWord 
    ? node.value
    : undefined;
};

Trie.prototype.delete = function (word = '') {
  validateString(word);
  
  let node = this.head;
  const wordSplit = word.split('');

  for (let i = 0; i < word.length; i++) {
    const c = wordSplit[i];
    if (!node.children[c]) {
      break;
    }
    
    node = node.children[c];
    if (i === word.length - 1 && node.isWord) {
      node.value = undefined;
      node.isWord = false;
    }
  }
};

Trie.prototype.findMatches = function (requiredChar = '', optionalChars = []) {
  const allUniqueChars = Array.from(new Set([...optionalChars, requiredChar]));
  // move through the nodes starting with the chars available, rejecting any child nodes not in the list
  
  const wordsThatMatch = []
  _findMatches(this.head, wordsThatMatch, requiredChar, allUniqueChars);

  return wordsThatMatch;
};

const createNode = () => {
  return {
    children: {},
    value: undefined,
    isWord: false
  };
};

module.exports = Trie;

const _findMatches = (node, matches, requiredChar, optionalChars) => {
  if (node && node.isWord && node.value.indexOf(requiredChar) !== -1) {
    matches.push(node.value);
  }

  // return findMatches with each child node that is in optional / required chars
  if (node) {
    optionalChars.forEach(c => {
      _findMatches(node.children[c], matches, requiredChar, optionalChars);
    });
  }
};

const validateString = (word) => {
  if (typeof word !== 'string') {
    throw new Error('You must supply a valid string');
  }
};