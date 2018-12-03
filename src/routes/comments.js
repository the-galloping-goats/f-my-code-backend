const express = require("express");
const router = express.Router();

const controllers = require("../controllers/comments");

// app.use(authorize);

// router.get("/", authorize, controllers.getAll);
// router.post("/", authorize, controllers.create);
// router.put("/:comment_id", authorize, permit, controllers.update);
// router.delete("/:comment_id", authorize, permit, controllers.remove);

module.exports = router;
