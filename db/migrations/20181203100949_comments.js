exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", table => {
    table.increments();
    table.string("content").notNullable().defaultsTo("");
    table.integer("post_id").references("id").inTable("posts");
    table.integer("user_id").references("id").inTable("users");
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("comments");
};
