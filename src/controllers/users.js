const models = require("../models/users");

function getOne(req, res, next) {
  return models.getOne(req.params.user_id)
    .then(user => {
      res.status(200).send(user);
    })
    .catch(next);
}

function create(req, res, next) {
  return models.createUser(req.body)
    .then(user => {
      res.status(201).send(user);
    })
    .catch(next);
}

module.exports = { create, getOne };
