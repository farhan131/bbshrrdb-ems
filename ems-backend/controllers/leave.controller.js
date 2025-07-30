const Leave = require("../models/leave.model");

exports.applyLeave = async (req, res) => {
  const { id: employeeId } = req.user;
  const { startDate, endDate, reason } = req.body;
  const leave = await Leave.create({ employeeId, startDate, endDate, reason });
  res.status(201).json(leave);
};

exports.getOwnLeaves = async (req, res) => {
  const { id: employeeId } = req.user;
  const leaves = await Leave.findAll({ where: { employeeId } });
  res.json(leaves);
};

exports.getAllLeaves = async (req, res) => {
  const leaves = await Leave.findAll();
  res.json(leaves);
};

exports.updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await Leave.update({ status }, { where: { id } });
  const updated = await Leave.findByPk(id);
  res.json(updated);
};
