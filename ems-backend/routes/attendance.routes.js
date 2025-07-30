const router = require("express").Router();
const controller = require("../controllers/attendance.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

router.use(authenticate);

router.post("/login", authorize("employee"), controller.markLogin);
router.post("/logout", authorize("employee"), controller.markLogout);
router.get("/", authorize("admin"), controller.getAllAttendance);
router.get("/:id", authorize("employee", "admin"), controller.getOwnAttendance);

module.exports = router;