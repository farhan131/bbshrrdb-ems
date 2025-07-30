const router = require("express").Router();
const controller = require("../controllers/leave.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

router.use(authenticate);
router.post("/", authorize("employee"), controller.applyLeave);
router.get("/", authorize("employee"), controller.getOwnLeaves);
router.get("/all", authorize("admin"), controller.getAllLeaves);
router.put("/:id", authorize("admin"), controller.updateLeaveStatus);

module.exports = router;
