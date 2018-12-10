const db = require("../../db");
const utils = require("../utils");

// paramter `entry` is not used, please remove
function getAll(entry) {
  return db("posts")
    .select("users.id AS user_id","posts.*", "users.username" )
    .join("users", "posts.user_id", "users.id")
    .then(data => {
      const promises = data.map( datum => {
        return db("ratings")
        .sum("rating AS rating")
        .where({ post_id: datum.id })
        .then(([ ratingData ]) => {
          if (ratingData.rating === null) {
            ratingData.rating = "0";
          }
          datum.rating = ratingData.rating;
          return datum;
        });
      })

      return Promise.all(promises);

    })
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
    // unwrap data here
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
    // unwrap data here
}

function remove(id) {
  return db("posts")
    .del()
    .where("id", id)
    .returning("*")
    // unwrap data here
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
      // add .first to get in db row
    })
}


module.exports = { getAll, create, update, remove, getRating };
