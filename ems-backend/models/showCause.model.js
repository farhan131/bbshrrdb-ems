const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Employee = require("./employee.model");

const ShowCause = sequelize.define("ShowCause", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employeeId: { type: DataTypes.INTEGER, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  response: { type: DataTypes.TEXT, allowNull: true },
  status: {
    type: DataTypes.ENUM("pending", "responded"),
    defaultValue: "pending",
  },
});

Employee.hasMany(ShowCause, { foreignKey: "employeeId" });
ShowCause.belongsTo(Employee, { foreignKey: "employeeId" });

module.exports = ShowCause;
