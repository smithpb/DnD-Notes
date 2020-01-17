const db = require("../../data/dbConfig.js");

module.exports = {
  getAll
};

async function getAll() {
  const npcs = db("npcs");
  return npcs;
}
