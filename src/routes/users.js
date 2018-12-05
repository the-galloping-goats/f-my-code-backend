const express = require("express");
const router = express.Router();

const controllers = require("../controllers/users");

router.get("/:user_id", controllers.getOne);
router.post("/", controllers.create);

module.exports = router;
