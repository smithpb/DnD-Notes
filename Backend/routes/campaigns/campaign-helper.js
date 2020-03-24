const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  create,
  remove,
  update
};

function getAll(author_id) {
  return db("campaigns").where({ author_id });
}

async function create(campaign) {
  const [{ id }] = await db("campaigns").insert(campaign, ["id"]);
  return getByID(id);
}

async function update(campaign) {
  const [{ id }] = await db("campaigns")
    .where("id", campaign.id)
    .update(campaign, ["id"]);
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
