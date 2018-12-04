exports.up = function(knex, Promise) {
  return knex.schema.createTable("posts", table => {
    table.increments();
    table.string("title").notNullable().defaultsTo("");
    table.string("description").notNullable().defaultsTo("");
    table.string("code").notNullable().defaultsTo("");
    table.integer("user_id").references("id").inTable("users");
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("posts");
};
