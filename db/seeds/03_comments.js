exports.seed = function(knex, Promise) {
  return("knex").del()
    .then(() => {
      return knex("comments")
        .insert([
          {
            id: 1,
            content: "Do you even code?",
            user_id: 1,
            post_id: 1
          },
          {
            id: 2,
            content: "You screwed up unforgivably. Uninstall your computer.",
            user_id: 1,
            post_id: 2
          },
          {
            id: 3,
            content: "Nice try! Maybe next time.",
            user_id: 2,
            post_id: 2
          },
          {
            id: 4,
            content: "I'm tired of all the anger and hate. Why can't we all be friends?",
            user_id: 3,
            post_id: 1
          }
        ])
    })
}
