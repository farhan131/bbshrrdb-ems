const express = require("express");
const router = express.Router();
const controller = require("../controllers/message.controller");
const { authenticate } = require("../middleware/auth.middleware");

router.use(authenticate);

router.post("/", controller.sendMessage);
router.get("/chat-users", controller.getChatUsers);
router.get("/:withUserId", controller.getConversation);

module.exports = router;
