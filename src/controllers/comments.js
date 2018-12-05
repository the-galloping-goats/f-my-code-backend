const models = require("../models/comments");

function getAll(req, res, next) {
  models.getAll(req.params.post_id)
    .then(data => {
      if (data.length < 1) {
        throw {
          status: 400,
          message: "There are no comments tied to that post"
        };
      }

      res.status(200).send(data);
    })
    .catch(next);
}

function create(req, res, next) {
  const postId = req.params.post_id;
  const userId = req.claim.sub.id;
  const entry = req.body;

  models.create(postId, userId, entry )
    .then(([ data ]) => {
      res.status(201).send(data);
    })
    .catch(next);
}

function update(req, res, next) {
  const commentId = req.params.comment_id;
  const postId = req.params.post_id;
  const revision = req.body;

  models.update(commentId, postId, revision)
    .then(([ post ]) => {
      if (!post) {
        throw {
          status: 400,
          message: "A post with that comment could not be found." }
      }

      res.status(200).send(post);
    })
    .catch(next);
}

function remove(req, res, next) {
  models.remove(req.params.comment_id)
    .then(([ data ]) => {
      res.status(200).send(data);
    })
    .catch(next);
}

module.exports = { getAll, create, update, remove };
