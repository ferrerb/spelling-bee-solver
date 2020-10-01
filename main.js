const path = require('path');
const express = require('express');

const { getAllWords } = require('./dictionary');
const Trie = require('./trie');
const { findWords } = require('./word-matcher');

const port = process.env.PORT || 3000;
const filePath = path.resolve(__dirname, `res/words_alpha.txt`);

const app = express();
app.use('/dist', express.static(path.join(__dirname, 'react-client/dist')));

// TODO: Need to reorganize this whole initialization thing
let trie;

const init = async () => {
  const words = await getAllWords(filePath);
  trie = new Trie();

  words.forEach(w => {
    trie.insert(w);
  });
};

app.get(`/api/matches`, (req, res) => {
  const { required, optional } = req.query;
  if (!required || !optional) {
    return res
      .status(404)
      .send({error: 'Required character and at least one optional characters must be present.'});
  }

  const matches = findWords(required, optional.split(''), trie);

  res.send(matches);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-client/public/index.html'));
});

init();
app.listen(port, () => {
  console.log(`Listing on port: ${port}`);
});