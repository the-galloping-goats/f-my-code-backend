const db = require("../../db");
const utils = require("../utils");

function create(entry) {
const errors = utils.verifyEntry(entry, "ratings")

  if (errors.length > 0 ) {
    throw { status: 400, message: "Missing " + errors.join(", ")
    };
  }
  return db("ratings")
  .insert(entry)
  .returning("*")
}

function remove(id) {
return db("ratings")
  .del()
  .where({id})
  .returning("*")
}

module.exports = { create, remove }