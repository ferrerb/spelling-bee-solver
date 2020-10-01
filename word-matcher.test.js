const { findWords } = require('./word-matcher');

describe('word-matcher tests', () => {
  const mockTrie = {
    findMatches: () => ['aie', 'aieou', 'uuooiieeaa', 'aoo']
  };
  
  test(`findWords returns the expected list`, () => {
    const matches = findWords('a', ['e', 'i', 'o', 'u'], mockTrie);

    expect(matches.length).toBe(2);
  });

  test(`findWords has pangrams marked correctly`, () => {
    const pangrams = ['aieou', 'uuooiieeaa'];
    const matches = findWords('a', ['e', 'i', 'o', 'u'], mockTrie);

    matches.forEach(m => {
      if (pangrams.indexOf(m.word) >= 0) {
        expect(m.isPangram).toBeTruthy();
      }
    });
  });
});