exports.up = function(knex, Promise) {
  return knex.schema.createTable("posts", table => {
    table.increments();
    table.string("title");
    table.string("description");
    table.string("code");
    table.integer("creator_id");
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists("posts");
};
