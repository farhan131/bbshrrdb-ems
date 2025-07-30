const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Leave = sequelize.define("Leave", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Employees",
      key: "id",
    },
  },
  startDate: DataTypes.DATEONLY,
  endDate: DataTypes.DATEONLY,
  reason: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending",
  },
});

module.exports = Leave;