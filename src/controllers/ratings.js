const models = require("../models/ratings");

function create(req, res, next) {
  const entry = req.body;
  entry.user_id = req.claim.sub.id
  entry.post_id = req.params.post_id
 
  models.create(entry)
  .then(response => {
    res.status(201).send(response)
  })
.catch(next)
}



function remove(req, res, next) {
const id = req.params.rating_id  
models.remove(id)
.then(response => {
  res.status(200).send(response)
})
.catch(next)
}

module.exports = { create, remove }