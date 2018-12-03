const models = require("../models/auth");
const jwt = require("jsonwebtoken");

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

module.exports = { login, authorize };
