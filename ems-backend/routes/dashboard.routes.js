const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");
const dashboardController = require("../controllers/dashboard.controller");

router.get("/stats", authenticate, dashboardController.getStats);
router.get("/tasks", authenticate, dashboardController.getUpcomingTasks);
router.get("/announcements", authenticate, dashboardController.getAnnouncements);
router.get("/users", authenticate, dashboardController.getAllUsers);
router.get("/attendance", authenticate, dashboardController.getAttendance);

module.exports = router;
