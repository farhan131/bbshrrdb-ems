const express = require("express");
const router = express.Router();
const controller = require("../controllers/deliverable.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/deliverables/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.use(authenticate);

// Admin: create
router.post("/", authorize("admin"), controller.createDeliverable);

// Employee: submit
router.put(
  "/submit/:id",
  authorize("employee"),
  upload.single("file"),
  controller.submitDeliverable
);

// Employee: view assigned
router.get("/my", authorize("employee"), controller.getMyDeliverables);

// Admin: view all
router.get("/all", authorize("admin"), controller.getAllDeliverables);

module.exports = router;
