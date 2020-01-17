const db = require("../dbConfig.js");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("npcs")
    .del()
    .then(async function() {
      const locations = await db("locations");
      // Inserts seed entries
      return knex("npcs").insert([
        {
          name: "The King",
          description: "He's the guy in charge",
          location_id: randomPlace(locations).id
        },
        {
          name: "The Jester",
          description: "What a tool",
          location_id: randomPlace(locations).id
        },
        {
          name: "The Knight",
          description: "The honorablest of the honorable",
          location_id: randomPlace(locations).id
        },
        {
          name: "The Rogue",
          description: "Bastard stole my everything",
          location_id: randomPlace(locations).id
        },
        {
          name: "The Cleric",
          description: "Need heals? Go to this guy",
          location_id: randomPlace(locations).id
        },
        {
          name: "The Queen",
          description: "Don't mess with her",
          location_id: randomPlace(locations).id
        }
      ]);
    });
};

function randomPlace(selection) {
  const index = Math.floor(Math.random() * selection.length);
  return selection[index];
}
