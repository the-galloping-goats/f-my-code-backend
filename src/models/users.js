const bcrypt = require("bcrypt");
const db = require("../../db");
const utils = require("../utils");

function getOne(user_id) {
  return db("users")
    .where({ id: user_id })
    .first();
}

function getOneByUsername(username) {
  return db("users")
    .where({ username: username })
    .first()
}

function createUser(entry) {
  const errors = utils.verifyEntry(entry, "users");

  if (errors.length > 0) {
    throw { status: 400, message: "Missing: " + errors.join(", ") };
  }

  return getOneByUsername(entry.username)
    .then(data => {
      if (data) {
        throw { status: 400, message: "Username already exists" };
      }

      return bcrypt.hash(entry.password, 10)
    })
    .then(hash => {
      entry.password = hash;

      return db("users")
      .insert(entry)
      .returning("*");
    })
    .then(([ user ]) => {
      delete user.password;

      return user;
    })
}

module.exports = { getOneByUsername, createUser, getOne };
