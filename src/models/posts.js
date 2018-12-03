const db = require("../../db");
const utils = require("../utils");

function create(entry) {
  const errors = utils.verifyEntry(entry, "posts");

  if (errors.length > 0) {
    throw { status: 400, message: "Missing: " + errors.join(", ") };
  }

  return db("posts")
    .insert(entry)
    .returning("*");
}

module.exports = { create };
