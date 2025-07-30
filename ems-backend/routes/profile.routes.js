const router = require("express").Router();
const controller = require("../controllers/profile.controller");
const { authenticate, authorizeSelfOrAdmin, authorize } = require("../middleware/auth.middleware");

router.use(authenticate);
router.get("/", authorize("admin"), controller.getAllProfiles);
router.get("/:id", authorizeSelfOrAdmin, controller.getProfileById);
router.put("/:id", authorizeSelfOrAdmin, controller.updateOwnProfile);

module.exports = router;
