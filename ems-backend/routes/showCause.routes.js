const express = require("express");
const router = express.Router();
const controller = require("../controllers/showCause.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

router.use(authenticate);

// Admin
router.post("/", authorize("admin"), controller.sendShowCause);
router.get("/all", authorize("admin"), controller.getAllShowCauses);

// Employee
router.get("/", authorize("employee"), controller.getMyShowCauses);
router.put("/:id", authorize("employee"), controller.respondShowCause);

module.exports = router;
