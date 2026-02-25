const express = require("express");
const router = express.Router();
const controller = require("../controllers/billingController");

router.get("/", controller.getBills);
router.post("/", controller.addBill);

module.exports = router;
