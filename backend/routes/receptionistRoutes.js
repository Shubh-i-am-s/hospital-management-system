const express = require("express");
const router = express.Router();
const controller = require("../controllers/receptionistController");

router.get("/", controller.getReceptionists);

module.exports = router;
