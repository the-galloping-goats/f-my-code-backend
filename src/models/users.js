const db = require("../../db");
const bcrypt = require("bcrypt");

function getOneByUsername(username) {
  return db("users")
    .where({ username: username })
    .first()
}

module.exports = { getOneByUsername };
