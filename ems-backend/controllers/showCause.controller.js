const ShowCause = require("../models/showCause.model");

// Admin creates a show cause
exports.sendShowCause = async (req, res) => {
  try {
    const { employeeId, subject, message } = req.body;
    const showCause = await ShowCause.create({ employeeId, subject, message });
    res.status(201).json(showCause);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin views all
exports.getAllShowCauses = async (req, res) => {
  try {
    const showCauses = await ShowCause.findAll();
    res.json(showCauses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee views their own
exports.getMyShowCauses = async (req, res) => {
  try {
    const showCauses = await ShowCause.findAll({ where: { employeeId: req.user.id } });
    res.json(showCauses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee responds
exports.respondShowCause = async (req, res) => {
  try {
    const showCause = await ShowCause.findOne({
      where: { id: req.params.id, employeeId: req.user.id },
    });

    if (!showCause || showCause.status === "responded") {
      return res.status(400).json({ error: "Invalid or already responded" });
    }

    showCause.response = req.body.response;
    showCause.status = "responded";
    await showCause.save();
    res.json(showCause);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
