const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Employee = require("./employee.model");

const Task = sequelize.define("Task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  deadline: { type: DataTypes.DATEONLY },
  status: {
    type: DataTypes.ENUM("pending", "completed"),
    defaultValue: "pending",
  },
  assignedTo: { type: DataTypes.INTEGER, allowNull: false },
});

Employee.hasMany(Task, { foreignKey: "assignedTo" });
Task.belongsTo(Employee, { foreignKey: "assignedTo" });

module.exports = Task;
