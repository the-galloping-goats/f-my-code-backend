exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, firstName: 'Nolan', lastName: 'Hellyer', username: 'nolwn' },
        { id: 2, firstName: 'Matthew', lastName: 'Camacho', username:'matthewcamacho' },
        { id: 2, firstName: 'Kevin', lastName: 'Parine', username:'kparine' },
        { id: 3, firstName: 'Tristan', lastName: 'Porter', username: 'Montijello' }
      ])
    }).then(()=> {
      return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`)
    })
}