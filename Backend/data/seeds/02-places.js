const db = require("../dbConfig.js");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("locations")
    .del()
    .then(async function() {
      // Inserts seed entries
      const { id } = await db("kingdoms").first();
      return knex("locations").insert([
        {
          name: "The Capital",
          description: "The heart of the Empire.",
          kingdom_id: id
        },
        {
          name: "A Small Village",
          description: "Tiny town where nothing happens",
          kingdom_id: id
        },
        {
          name: "Mysterious Forest",
          description: "Stuff goes in and doesn't come out",
          kingdom_id: id
        }
      ]);
    });
};
