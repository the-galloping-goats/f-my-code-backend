const models = require("../models/auth");
const jwt = require("jsonwebtoken");
const db = require("../../db");

function login(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    next({ status: 400, message: "Bad Request" });
  } else {
    models.login(username, password)
    .then(user => {
      const token = jwt.sign({ sub: { id: user.id } }, process.env.SECRET);

      res.status(200).send({ token });
    })
    .catch(next);
  }
}

/*
 *  QUALITY OF LIFE FUNCTIONS
 */

function authorize(req, res, next) {
  if (!req.headers.authorization) {
    next({ status: 401, message: "Unauthorized" });
  } else {
    const [ scheme, token ] = req.headers.authorization.split(" ");

    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (err) {
        next({ status: 401, message: "Unauthorized" });
      }

      req.claim = payload;

      next();
    });
  }
}

function editPost(req, res, next) {
  permit("posts", req.params.post_id, req.claim)
    .then(next)
    .catch(next);
}

function editComment() {
  permit("comments", req.params.post_id, req.claim)
    .then(next)
    .catch(next);
}

function editRating() {
  permit("ratings", req.params.post_id, req.claim)
    .then(next)
    .catch(next);
}

// function deleteComment() {
//   permit("posts", req.params.post_id, req.claim)
//     .then(next)
//     .catch(next);
// }

function permit(table, id, claim) {
  return db(table)
    .where({ id: id })
    .then(([ data ]) => {
      if (data.user_id !== claim.sub.id) {
        throw { status: 401, message: "Unauthorized" };
      }
    });
}

function test(req, res, next) {
  res.status(200).send("Yay!");
}

module.exports = { login, authorize, test, editPost };
