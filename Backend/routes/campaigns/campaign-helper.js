const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  create
};

function getAll() {
  return db("campaigns");
}

async function create(campaign) {
  const [{ id }] = await db("campaigns").insert(campaign, ["id"]);
  return getByID(id);
}

function getByID(id) {
  return db("campaigns")
    .where({ id })
    .first();
}
