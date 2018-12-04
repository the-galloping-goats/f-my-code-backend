exports.seed = function(knex, Promise) {
  // return("posts").del()
  //   .then(() => {
      return knex("posts")
        .insert([
          {
            id: 1,
            title: "I feel like this should work",
            description: "I was working away on this code, and I don't understand why it won't run! This sohould work...",
            code: `function addNumbers(first, second) {
              const answer = first + first;
              return answer;
            }`,
            user_id: 4
          },
          {
            id: 2,
            title: "Is this a good way to do this?",
            description: "It kind of works... am I close at least?",
            code: `(pants, color) => "Your " + color " are " + pants "!";`,
            user_id: 3
          }
        ])
    // })
}
