const Deliverable = require("../models/deliverable.model");

// Admin: create deliverable
exports.createDeliverable = async (req, res) => {
  try {
    const { title, description, dueDate, assignedTo } = req.body;
    const deliverable = await Deliverable.create({
      title,
      description,
      dueDate,
      assignedTo,
    });
    res.status(201).json(deliverable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee: submit deliverable
exports.submitDeliverable = async (req, res) => {
  try {
    const { id } = req.params;
    const { submissionText } = req.body;

    const deliverable = await Deliverable.findByPk(id);
    if (!deliverable || deliverable.assignedTo !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    deliverable.status = "submitted";
    deliverable.submissionText = submissionText;
    if (req.file) {
      deliverable.submissionFile = req.file.path;
    }

    await deliverable.save();
    res.json(deliverable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee: get their deliverables
exports.getMyDeliverables = async (req, res) => {
  try {
    const deliverables = await Deliverable.findAll({
      where: { assignedTo: req.user.id },
    });
    res.json(deliverables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: get all deliverables
exports.getAllDeliverables = async (req, res) => {
  try {
    const deliverables = await Deliverable.findAll();
    res.json(deliverables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
