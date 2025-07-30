const Employee = require("../models/employee.model");
const bcrypt = require("bcrypt");

exports.getAllEmployees = async (req, res) => {
  const users = await Employee.findAll({ attributes: { exclude: ["password"] } });
  res.json(users);
};

exports.getEmployee = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== "admin" && req.user.id != id)
    return res.status(403).json({ error: "Forbidden" });
  const user = await Employee.findByPk(id, { attributes: { exclude: ["password"] } });
  res.json(user);
};

exports.createEmployee = async (req, res) => {
  const { name, email, password, phone, designation, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await Employee.create({ name, email, password: hashed, phone, designation, role });
  res.status(201).json(user);
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== "admin" && req.user.id != id)
    return res.status(403).json({ error: "Forbidden" });
  const updated = await Employee.update(req.body, { where: { id } });
  res.json({ message: "Updated" });
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Forbidden" });
  await Employee.destroy({ where: { id } });
  res.json({ message: "Deleted" });
};