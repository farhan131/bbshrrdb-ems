const Attendance = require("../models/attendance.model");
const { Op } = require("sequelize");

exports.markLogin = async (req, res) => {
  const { id } = req.user;
  const today = new Date().toISOString().split("T")[0];
  const existing = await Attendance.findOne({ where: { employeeId: id, date: today } });
  if (existing) return res.status(400).json({ error: "Already logged in today" });

  const record = await Attendance.create({
    employeeId: id,
    loginTime: new Date(),
  });
  res.status(201).json(record);
};

exports.markLogout = async (req, res) => {
  const { id } = req.user;
  const today = new Date().toISOString().split("T")[0];
  const record = await Attendance.findOne({
    where: { employeeId: id, date: today },
  });
  if (!record) return res.status(404).json({ error: "No login found today" });
  if (record.logoutTime) return res.status(400).json({ error: "Already logged out" });

  record.logoutTime = new Date();
  await record.save();
  res.json(record);
};

exports.getOwnAttendance = async (req, res) => {
  const { id } = req.user;
  const records = await Attendance.findAll({
    where: { employeeId: id },
    order: [["date", "DESC"]],
  });
  res.json(records);
};

exports.getAllAttendance = async (req, res) => {
  const records = await Attendance.findAll({ order: [["date", "DESC"]] });
  res.json(records);
};