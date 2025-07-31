const express = require("express");
const router = express.Router();
const controller = require("../controllers/document.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const multer = require("multer");

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/documents/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.use(authenticate);

router.post("/", upload.single("file"), controller.uploadDocument);
router.get("/my", authorize("employee"), controller.getMyDocuments);
router.get("/all", authorize("admin"), controller.getAllDocuments);

module.exports = router;
