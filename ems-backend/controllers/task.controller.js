const Task = require("../models/task.model");

// Admin creates a task for employee
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline, assignedTo } = req.body;
    const task = await Task.create({ title, description, deadline, assignedTo });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee gets their own tasks
exports.getOwnTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { assignedTo: req.user.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin gets all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee marks a task as completed
exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, assignedTo: req.user.id } });
    if (!task) return res.status(404).json({ error: "Task not found or unauthorized" });

    task.status = "completed";
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
