exports.up = function(knex, Promise) {
  return knex.schema.createTable("ratings", table => {
    table.increments();
    table.integer("rating").notNullable();
    table.integer("user_id").references("id").inTable("users").notNullable();
    table.integer("post_id").references("id").inTable("posts").notNullable().onDelete("CASCADE");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("ratings");
};
