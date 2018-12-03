const express = require("express");
const router = express.Router();

const controllers("../controllers/ratings");

router.post("/", authorize, controllers.create);
router.put("/:rating_id", authorize, permit, controllers.update);
router.delete("/:rating_id", authorize, permit, controllers.remove);

module.exports = router;
