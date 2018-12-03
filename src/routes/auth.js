const express = require("express");
const router = express.Router();

const controllers("../controllers/auth");

router.post("/token", controllers.login);

module.exports = router;
