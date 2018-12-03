exports.up = function(knex, Promise) {
  return knex.schema.createTable("ratings", table => {
    table.increments();
    table.integer("rating").notNullable();
    table.integer("user_id").references("id").inTable("users");
    table.integer("post_id").references("id").inTable("posts");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("ratings");
};
