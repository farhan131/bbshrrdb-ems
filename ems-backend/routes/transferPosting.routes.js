const express = require("express");
const router = express.Router();
const controller = require("../controllers/transferPosting.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

router.use(authenticate);

// Employee routes
router.post("/", authorize("employee"), controller.applyTransfer);
router.get("/", authorize("employee"), controller.getOwnTransfers);

// Admin routes
router.get("/all", authorize("admin"), controller.getAllTransfers);
router.put("/:id", authorize("admin"), controller.updateTransferStatus);

module.exports = router;
