exports.up = function (knex, Promise) {
  knex.schema.createTable("comments", table => {
    table.increments();
    table.string("content");
    table.integer("post_id").references("id").inTable("posts");
    table.integer("user_id");
    table.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
 knex.schema.dropTableIfExists("comments");
};