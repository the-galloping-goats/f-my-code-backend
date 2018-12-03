const express = require("express");
const router = express.Router();

const controllers("../controllers/users");

// router.get("/user_id", controllers.getOne);
router.post("/", controllers.create);

module.exports = router;
