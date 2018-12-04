const db = require("../../db");
const utils = require("../utils");


function getAll(postId) {
  return db("comments")
    .where({ post_id: postId });
}

function create(postId, userId, entry) {
  const errors = utils.verifyEntry(entry, "comments");

  if (errors.length > 0) {
    throw { status: 400, message: "Missing: " + errors.join(", ") };
  }

  entry.post_id = postId;
  entry.user_id = userId

  return db("posts")
    .where({ id: postId })
    .then(post => {
      if (post.length < 1) {
        throw { status: 400, message: "A post with that id does not exist" };
      }

      return db("comments")
      .where({ post_id: postId })
      .insert(entry)
      .returning("*");
    })
}

function update(commentId, postId, revision) {
  return db("comments")
    .update(revision)
    .where({ post_id: postId, id: commentId })
    .returning("*");
}

function remove(commentId, byType, byId, revision) {
  // const error = utils.verifyEntry(revision, table);
  //
  // if (errors.length > 0) {
  //   throw { status: 400, message: "Missing: " + errors.joing(", ") };
  // }
  //
  // return db("comments")
  //   .where({ id: commentId })
  //   .then(data => {
  //     if (data.length < 1) {
  //       throw { status: 400, message: "No comment with that id exists." };
  //     }
  //
  //     return db(table + "s")
  //       .where({ byType: byId + "_id" })
  //       .update(revision)
  //       .returning("*");
  //   })
}

module.exports = { getAll, create, update };
