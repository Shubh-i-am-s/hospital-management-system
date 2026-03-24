const express = require("express");
const router = express.Router();
const controller = require("../controllers/departmentController");

router.get("/", controller.getDepartments);
router.post("/", controller.createDepartment);

module.exports = router;
