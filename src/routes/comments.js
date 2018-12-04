const express = require("express");
const router = express.Router({ mergeParams: true });

const controllers = require("../controllers/comments");
const authController = require("../controllers/auth");

router.get("/", authController.authorize, controllers.getAll);
router.post("/", authController.authorize, controllers.create);
router.put("/:comment_id", authController.authorize, authController.editComment, controllers.update);
// router.delete("/:comment_id", authorize, permit, controllers.remove);

module.exports = router;
