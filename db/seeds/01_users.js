exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1,
          firstName: 'Nolan',
          lastName: 'Hellyer',
          username: 'nolwn',
          password: "$2a$10$qxHiSnpn8wzODoiILTLdIeBhysa1mN8bDGM5e46EUvN3OmG6qY2JK"},
        { id: 2, firstName: 'Matthew', lastName: 'Camacho', username:'matthewcamacho', password: "$2a$10$qxHiSnpn8wzODoiILTLdIeBhysa1mN8bDGM5e46EUvN3OmG6qY2JK"},
        { id: 3, firstName: 'Kevin', lastName: 'Parine', username:'kparine', password: "$2a$10$qxHiSnpn8wzODoiILTLdIeBhysa1mN8bDGM5e46EUvN3OmG6qY2JK"},
        { id: 4, firstName: 'Tristan', lastName: 'Porter', username: 'Montijello', password: "$2a$10$qxHiSnpn8wzODoiILTLdIeBhysa1mN8bDGM5e46EUvN3OmG6qY2JK"}
      ])
    }).then(()=> {
      return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`)
    })
}
