exports.seed = function(knex, Promise) {
  return knex("ratings").del()
    .then(() => {
      return knex("comments").del();
    })
    .then(() => {
      return knex("posts").del();
    })
    .then(() => {
      return knex("users").del();
    })
}
