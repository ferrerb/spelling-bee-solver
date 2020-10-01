const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

const getAllWords = async (filePath) => {
  return (await readFile(filePath)).toString().split('\r\n');
};

module.exports = {
  getAllWords
};