const models = require("../models/posts");

function create(req, res, next) {
  const entry = req.body;
  entry.user_id = req.claim.sub.id;

  models.create(entry)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(next);
}

function remove(req, res, next) {
  const id = req.params.post_id
  models.remove(id)
  .then(data => {
    if (data.length < 1) {
      throw { status: 404, message: "No Post Associated With The Given ID"}
  }
      res.status(200).send(entry)
    })
    .catch(next)
}


module.exports = { create, remove }