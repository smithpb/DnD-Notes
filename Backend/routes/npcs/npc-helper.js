const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  findByName,
  create
};

async function getAll() {
  const npcs = db("npcs");
  return npcs;
}

async function findByName(name) {
  const npc = await db("npcs as n")
    .join("locations as l", "n.location_id", "l.id")
    .where("n.name", name)
    .select(
      "n.id",
      "n.name",
      "n.description",
      "n.created_at",
      "l.name as location"
    );
  return npc;
}

async function create(npc) {
  const [{ id }] = await db("npcs").insert(npc, ["id"]);
  return findByID(id);
}

function findByID(id) {
  return db("npcs")
    .where({ id })
    .first();
}
