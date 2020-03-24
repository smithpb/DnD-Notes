const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  create,
  remove
};

function getAll(author_id) {
  return db("campaigns").where({ author_id });
}

async function create(campaign) {
  const [{ id }] = await db("campaigns").insert(campaign, ["id"]);
  return getByID(id);
}

function remove(id) {
  return db("campaigns")
    .where({ id })
    .del();
}

function getByID(id) {
  return db("campaigns")
    .where({ id })
    .first();
}
