const express = require("express");
const router = express.Router();

const controllers = require("../controllers/auth");

router.post("/token", controllers.login);

module.exports = router;
