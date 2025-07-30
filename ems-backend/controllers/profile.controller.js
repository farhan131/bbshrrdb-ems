const Employee = require("../models/employee.model");

exports.getOwnProfile = async (req, res) => {
  const { id } = req.user;
  const profile = await Employee.findByPk(id, { attributes: { exclude: ["password"] } });
  res.json(profile);
};

exports.updateOwnProfile = async (req, res) => {
  const { id } = req.user;
  const updates = req.body;
  await Employee.update(updates, { where: { id } });
  const updated = await Employee.findByPk(id, { attributes: { exclude: ["password"] } });
  res.json(updated);
};

exports.getAllProfiles = async (req, res) => {
  const profiles = await Employee.findAll({ attributes: { exclude: ["password"] } });
  res.json(profiles);
};

exports.getProfileById = async (req, res) => {
  const { id } = req.params;
  const profile = await Employee.findByPk(id, { attributes: { exclude: ["password"] } });
  if (!profile) return res.status(404).json({ error: "User not found" });
  res.json(profile);
};