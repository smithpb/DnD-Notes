const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  create
};

async function getAll() {
  const kingdoms = db("kingdoms");
  return kingdoms;
}

async function create(kingdom) {
  const [{ id }] = await db("kingdoms").insert(kingdom, ["id"]);
  return findByID(id);
}

function findByID(id) {
  return db("kingdoms")
    .where({ id })
    .first();
}
