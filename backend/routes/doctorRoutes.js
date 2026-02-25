const express = require("express");
const router = express.Router();
const controller = require("../controllers/doctorController");

router.get("/", controller.getAllDoctors);
router.post("/", controller.addDoctor);

module.exports = router;
