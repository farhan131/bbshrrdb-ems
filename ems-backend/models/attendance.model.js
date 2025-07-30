const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Employee = require("./employee.model");

const Attendance = sequelize.define("Attendance", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: "id",
    },
  },
  loginTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  logoutTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
});

Attendance.belongsTo(Employee, { foreignKey: "employeeId" });
module.exports = Attendance;