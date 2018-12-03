exports.up = function(knex, Promise) {
  knex.schema.createTable("ratings", table => {
    table.increments();
    table.integer("user_id");
    table.integer("post_id").references("id").inTable("posts");
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists("ratings");
};
