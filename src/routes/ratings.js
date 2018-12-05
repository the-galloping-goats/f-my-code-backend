const express = require("express");
const router = express.Router();

const controllers = require("../controllers/ratings");
const authController = require("../controllers/auth");

router.post("/", authController.authorize, controllers.create);
// router.put("/:rating_id", authorize, authController.authorize, controllers.update);
// router.delete("/:rating_id", authorize, authController.authorize, controllers.remove);

module.exports = router;
