const express = require("express");
const router = express.Router();
const controller = require("../controllers/patientController");

router.get("/", controller.getAllPatients);
router.post("/", controller.addPatient);

module.exports = router;
