const Explanation = require("../models/explanation.model");

// Admin creates explanation
exports.sendExplanation = async (req, res) => {
  try {
    const { employeeId, subject, message } = req.body;
    const explanation = await Explanation.create({ employeeId, subject, message });
    res.status(201).json(explanation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin views all explanations
exports.getAllExplanations = async (req, res) => {
  try {
    const explanations = await Explanation.findAll();
    res.json(explanations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee views their own explanations
exports.getMyExplanations = async (req, res) => {
  try {
    const explanations = await Explanation.findAll({ where: { employeeId: req.user.id } });
    res.json(explanations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee responds to an explanation
exports.respondExplanation = async (req, res) => {
  try {
    const explanation = await Explanation.findOne({
      where: { id: req.params.id, employeeId: req.user.id },
    });

    if (!explanation || explanation.status === "responded") {
      return res.status(400).json({ error: "Invalid explanation or already responded" });
    }

    explanation.response = req.body.response;
    explanation.status = "responded";
    await explanation.save();
    res.json(explanation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
