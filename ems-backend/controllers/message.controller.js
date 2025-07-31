const Message = require("../models/message.model");
const User = require("../models/user.model");

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const message = await Message.create({
      senderId: req.user.id,
      receiverId,
      content,
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get conversation with another user
exports.getConversation = async (req, res) => {
  try {
    const { withUserId } = req.params;
    const messages = await Message.findAll({
      where: {
        [require("sequelize").Op.or]: [
          { senderId: req.user.id, receiverId: withUserId },
          { senderId: withUserId, receiverId: req.user.id },
        ],
      },
      order: [["createdAt", "ASC"]],
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get list of users user has chatted with
exports.getChatUsers = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: {
        [require("sequelize").Op.or]: [
          { senderId: req.user.id },
          { receiverId: req.user.id },
        ],
      },
      include: [
        { model: User, as: "Sender", attributes: ["id", "name", "role"] },
        { model: User, as: "Receiver", attributes: ["id", "name", "role"] },
      ],
    });

    const users = new Set();
    messages.forEach(msg => {
      if (msg.senderId !== req.user.id) users.add(JSON.stringify(msg.Sender));
      if (msg.receiverId !== req.user.id) users.add(JSON.stringify(msg.Receiver));
    });

    res.json([...users].map(u => JSON.parse(u)));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
