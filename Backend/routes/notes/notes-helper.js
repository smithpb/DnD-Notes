const db = require("../../data/dbConfig.js");

module.exports = {
  getAll
};

async function getAll() {
  const notes = await db("notes");
  return notes;
}
