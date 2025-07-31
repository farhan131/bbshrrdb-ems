const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Employee = require("./employee.model");

const TransferPosting = sequelize.define("TransferPosting", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employeeId: { type: DataTypes.INTEGER, allowNull: false },
  currentDepartment: { type: DataTypes.STRING, allowNull: false },
  requestedDepartment: { type: DataTypes.STRING, allowNull: false },
  reason: { type: DataTypes.TEXT, allowNull: true },
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending",
  },
});

Employee.hasMany(TransferPosting, { foreignKey: "employeeId" });
TransferPosting.belongsTo(Employee, { foreignKey: "employeeId" });

module.exports = TransferPosting;
