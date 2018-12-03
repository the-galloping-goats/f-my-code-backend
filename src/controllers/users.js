const models = require("../models/users");

function create(req, res, next) {
  return models.createUser(req.body)
    .then(user => {
      res.status(201).send(user);
    })
    .catch(next);
}

module.exports = { create };
