const router = require("express").Router();
const controller = require("../controllers/employee.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

router.use(authenticate);

router.get("/", authorize("admin"), controller.getAllEmployees);
router.get("/:id", controller.getEmployee);
router.post("/", authorize("admin"), controller.createEmployee);
router.put("/:id", controller.updateEmployee);
router.delete("/:id", authorize("admin"), controller.deleteEmployee);

module.exports = router;
