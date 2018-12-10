const models = require("../models/auth");
const jwt = require("jsonwebtoken");
const db = require("../../db");

//  Logs the user in, returns the jwt token.
function login(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) { // Requires a username and password
    next({ status: 400, message: "Bad Request" });
  } else {
    models.login(username, password)
    .then(user => {
      const token = jwt.sign({ sub: { id: user.id } }, process.env.SECRET);

      res.status(200).send({ id: user.id, token });
    })
    .catch(next);
  }
}

/*
 *  QUALITY OF LIFE FUNCTIONS
 */

//  Checks the header for a valid jwt token.
function authorize(req, res, next) {
  if (!req.headers.authorization) { // look for the authorization header
    next({ status: 401, message: "Unauthorized" });
  } else {
    // Pull the token of the authorization heading

    const [ scheme, token ] = req.headers.authorization.split(" ");

    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (err) {
        console.log(err);

        next({ status: 401, message: "Unauthorized" });
      }

      // The payload has been re-encoded from base64 to unicode. Attach it to
      // the req for later use.
      req.claim = payload;

      next();
    });
  }
}

/*
 *  The middlewares below pass their respective tables along with the params id
 *  and the stored token claim to a helper function, permit, below which checks
 *  that the item at the given parameter id has a
 */
function editPost(req, res, next) {
  permit("posts", req.params.post_id, req.claim)
    .then(next)
    .catch(next);
}

function editComment(req, res, next) {
  permit("comments", req.params.comment_id, req.claim)
    .then(next)
    .catch(next);
}

// remove unused code

// function editCommentByPost(req, res, next) {
//   permit("posts", req.params.post_id, req.claim)
//     .then(next)
//     .catch(next);
// }

// this is a really good abstraction
// It can be a bit dangerous because it depends on the
// .then invoking next with no arguments.
// a clearer alternative would be
// .then(_ => next())
function editRating(req, res, next) {
  permit("ratings", req.params.rating_id, req.claim)
    .then(next)
    .catch(next);
}

function deleteComment(req, res, next) {
  postDeletePermit(req.params.post_id, req.claim)
    .then(([ data ]) => {
      console.log(data);
      if (!data) {
        permit("comments", req.params.comment_id, req.claim)
          // see above comment
          .then(next)
          .catch(next);
      } else {
        next();
      }
    });
}

function permit(table, id, claim) {
  return db(table)
    .where({ id: id })
    .then(([ data ]) => {
      if (!data) {
        throw { status: 400, message: "Bad Request" };
      }

      if (data.user_id !== claim.sub.id) {
        throw { status: 401, message: "Unauthorized" };
      }
  });
}

function postDeletePermit(postId, claim) {
  return db("posts")
    .where({ id: postId, user_id: claim.sub.id });
}

// remove unused code
function test(req, res, next) {
  res.status(200).send("Yay!");
}

module.exports = {
  login,
  authorize,
  test,
  editPost,
  editRating,
  editComment,
  deleteComment
};
