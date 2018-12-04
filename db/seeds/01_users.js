exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1,
          first_name: 'Nolan',
          last_name: 'Hellyer',
          username: 'nolwn',
          password: "$2a$10$qxHiSnpn8wzODoiILTLdIeBhysa1mN8bDGM5e46EUvN3OmG6qY2JK"},
        { id: 2,
          first_name: 'Matthew',
          last_name: 'Camacho',
          username:'matthewcamacho',
          password: "$2a$10$qxHiSnpn8wzODoiILTLdIeBhysa1mN8bDGM5e46EUvN3OmG6qY2JK"},
        { id: 3,
          first_name: 'Kevin',
          last_name: 'Parine',
          username:'kparine',
          password: "$2a$10$qxHiSnpn8wzODoiILTLdIeBhysa1mN8bDGM5e46EUvN3OmG6qY2JK"},
        { id: 4,
          first_name: 'Tristan',
          last_name: 'Porter',
          username: 'Montijello',
          password: "$2a$10$qxHiSnpn8wzODoiILTLdIeBhysa1mN8bDGM5e46EUvN3OmG6qY2JK"}
      ])
    }).then(()=> {
      return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`)
    })
}
