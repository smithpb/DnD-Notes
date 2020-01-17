const db = require("../../data/dbConfig.js");

module.exports = {
  getAll
};

async function getAll() {
  const locations = db("locations");
  return locations;
}
