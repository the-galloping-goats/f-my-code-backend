const models = require("../models/ratings");

function create(req, res, next) {
  const entry = req.body;
  entry.post_id = req.claim.sub.id
 
  models.create(entry)
  .then(response => {
    res.status(201).send(response)
  })
.catch(next)
}

module.exports = { create }