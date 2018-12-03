exports.seed = function(knex, Promise) {
  return("knex").del()
    .then(() => {
      return knex("comments")
        .insert([
          {
            id: 1,
            rating: 1,
            user_id: 1,
            post_id: 1
          },
          {
            id: 2,
            rating: 5,
            user_id: 2,
            post_id: 1
          },
          {
            id: 3,
            rating: 5,
            user_id: 3,
            post_id: 2
          }
        ])
    })
}
