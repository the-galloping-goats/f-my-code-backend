const db = require("../../db");
const utils = require("../utils");


function getAll(entry) {
  return db("posts")
}

function create(entry) {
  const errors = utils.verifyEntry(entry, "posts");

  if (errors.length > 0) {
    throw {
      status: 400,
      message: "Missing: " + errors.join(", ")
    };
  }
  return db("posts")
    .insert(entry)
    .returning("*");
}

function update(entry, id) {
  const errors = utils.verifyEntry(entry, "posts")

  if (errors.length > 0) {
    throw {
      status: 400,
      message: "Missing " + errors.join(", ")
    };
  }

  return db("posts")
    .update(entry)
    .where({
      id: id
    })
    .returning("*")
}

function remove(id) {
  return db("posts")
    .del()
    .where("id", id)
    .returning("*")
}

function getRating(postId) {
  return db("posts")
    .where({ id: postId })
    .then(([ post ]) => {
      if (!post) {
        throw { status: 400, message: "The post does not exist" };
      }
    })
    .then(() => {
      return db("ratings")
      .sum("rating AS rating")
      .where({ post_id: postId });
    })
}


module.exports = { getAll, create, update, remove, getRating };
