const express = require("express");
const router = express.Router();

const controllers = require("../controllers/posts");

// router.get("/", controllers.getAll);
// router.get("/:post_id", controllers.getOne);
//
// router.post("/", authorize, controllers.create);
// router.put("/:post_id", authorize, permit, controllers.update);
// router.delete("/:post_id", authorize, permit, controllers.remove);

module.exports = router;
