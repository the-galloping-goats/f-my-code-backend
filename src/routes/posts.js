const express = require("express");
const router = express.Router();

const controllers = require("../controllers/posts");
const authController = require("../controllers/auth");

// router.get("/", controllers.getAll);
// router.get("/:post_id", controllers.getOne);
router.post("/", authController.authorize, controllers.create);
// router.put("/:post_id", authController.authorize, authController.editPost, controllers.update);
router.delete("/:post_id", authController.authorize, authController.editPost, controllers.remove);

module.exports = router;
