const Trie = require('./trie');

describe('trie testing', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  test('inserting a value throws no error', () => {
    expect(() => trie.insert('asdf')).not.toThrow(Error);
  });

  test('inserting a non-string throws an error', () => {
    expect(() => trie.insert(undefined)).toThrow(Error);
  });

  test('a newly inserted word is found', () => {
    const word = 'bravo';
    trie.insert(word);

    expect(trie.find(word)).toEqual(word); 
  });

  test(`no word found if it is hasn't been inserted`, () => {
    expect(trie.find('gobbldygook')).toBeUndefined();
  });

  test(`delete means the word isn't found afterwards`, () => {
    const word = 'gobbldey';
    trie.insert(word);
    trie.delete(word);

    expect(trie.find(word)).toBeUndefined();
  });

  test(`delete gets rid of the correct word`, () => {
    const word = 'delete';
    const wordNotDeleted = 'deleted';
    trie.insert(word);
    trie.insert(wordNotDeleted);
    trie.delete(word);

    expect(trie.find(wordNotDeleted)).toEqual(wordNotDeleted);
  });

  test(`findMatches finds the correct words for a collection of chars`, () => {
    const expectedMatches = ['one', 'oneone'];

    trie.insert('one');
    trie.insert('oneone');
    trie.insert('on');
    trie.insert('ean');
    const matches = trie.findMatches('e', ['n', 'o'], );

    expect(matches.sort()).toEqual(expectedMatches);
  });
});