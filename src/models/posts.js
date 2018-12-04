const db = require("../../db");
const utils = require("../utils");


// function getAll(entry) {
//   models.getAll(req.params.id)
//   .then(entry => { if(entry) return res.status(200).send(data) })
//     .catch(next)
// }

function create(entry) {
  const errors = utils.verifyEntry(entry, "posts");

  if (errors.length > 0) {
    throw { status: 400, message: "Missing: " + errors.join(", ")
    };
  }

  return db("posts")
    .insert(entry)
    .returning("*");
}

// function update(entry) {
//   const errors = utils.verifyEntry(entry, "posts")
//   const body = req.body

//   if (errors.length > 0) {
//     throw { status: 400, message: "Missing " + errors.join(", ")
//     };
//   }
//     return db("posts")
//      .where({id: body.id })
//      .update(entry)
//      .returning("*")
// }

function remove(id) {
  return db("posts")
    .del()
    .where("id", id)
    .returning("*")
}


module.exports = { create, remove };