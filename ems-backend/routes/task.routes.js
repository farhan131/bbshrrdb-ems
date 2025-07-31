const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

router.use(authenticate);

// Admin creates task
router.post("/", authorize("admin"), taskController.createTask);

// Employee views own tasks
router.get("/", authorize("employee"), taskController.getOwnTasks);

// Admin views all tasks
router.get("/all", authorize("admin"), taskController.getAllTasks);

// Employee marks task as completed
router.put("/:id", authorize("employee"), taskController.updateTaskStatus);

module.exports = router;
