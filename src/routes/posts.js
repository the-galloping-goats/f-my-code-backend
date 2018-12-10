const express = require("express");
const router = express.Router({mergeParams:true});

const controllers = require("../controllers/posts");
const authController = require("../controllers/auth");

router.get("/", controllers.getAll);
router.get("/:post_id/rating", controllers.getRating);
router.post("/", authController.authorize, controllers.create);
router.put("/:post_id", authController.authorize, authController.editPost, controllers.update);
router.delete("/:post_id", authController.authorize, authController.editPost, controllers.remove);

router.use('/:post_id/comments', require('./routes/comments'))
router.use('/:post_id/ratings', require('./routes/ratings'))


module.exports = router;
