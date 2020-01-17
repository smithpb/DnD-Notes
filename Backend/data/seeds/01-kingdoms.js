exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("kingdoms")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("kingdoms").insert([
        {
          name: "The Empire",
          description: "The best place both sides of the Mississippi."
        }
      ]);
    });
};
