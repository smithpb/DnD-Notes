const db = require("../../data/dbConfig.js");

module.exports = {
  getAll
};

async function getAll() {
  const kingdoms = db("kingdoms");
  return kingdoms;
}
