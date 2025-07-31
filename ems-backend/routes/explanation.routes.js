const express = require("express");
const router = express.Router();
const controller = require("../controllers/explanation.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

router.use(authenticate);

// Admin routes
router.post("/", authorize("admin"), controller.sendExplanation);
router.get("/all", authorize("admin"), controller.getAllExplanations);

// Employee routes
router.get("/", authorize("employee"), controller.getMyExplanations);
router.put("/:id", authorize("employee"), controller.respondExplanation);

module.exports = router;
