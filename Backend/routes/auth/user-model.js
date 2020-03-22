const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  create,
  findUsername,
  findByID
};

async function getAll() {
  const users = await db("users");
  return users;
}

async function create(user) {
  const [{ id }] = await db("users").insert(user, ["id"]);
  return findByID(id);
}

async function findUsername(username) {
  const user = await db("users")
    .where({ username })
    .first();
  return user;
}

function findByID(id) {
  return db("users")
    .select("username", "id")
    .where({ id })
    .first();
}
