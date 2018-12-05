const express = require("express");
const router = express.Router({mergeParams: true});

const controllers = require("../controllers/ratings");
const authController = require("../controllers/auth");

router.post("/", authController.authorize, controllers.create);
router.put("/:rating_id", authController.authorize, authController.editRating, controllers.update);
router.delete("/:rating_id", authController.authorize, authController.editRating ,controllers.remove);

module.exports = router;
