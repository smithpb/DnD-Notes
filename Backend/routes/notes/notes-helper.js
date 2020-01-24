const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  create,
  remove,
  update
};

async function getAll() {
  const notes = await db("notes as n")
    .join("locations as l", "n.location_id", "l.id")
    .select("n.id", "n.text", "n.is_quest", "n.created_at", "l.name");
  return notes;
}

async function create(note) {
  const [{ id }] = await db("notes").insert(note, ["id"]);
  return findByID(id);
}

function remove(id) {
  return db("notes")
    .where({ id })
    .del();
}

async function update(note) {
  const [{ id }] = await db("notes")
    .where("id", note.id)
    .update(note, ["id"]);
  return findByID(id);
}

function findByID(id) {
  return db("notes")
    .where({ id })
    .first();
}
