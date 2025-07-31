const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");

module.exports = (sequelize, DataTypes) => {
  const Deliverable = sequelize.define("Deliverable", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    dueDate: { type: DataTypes.DATE, allowNull: false },
    assignedTo: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM("pending", "submitted"),
      defaultValue: "pending"
    },
    submissionText: { type: DataTypes.TEXT },
    submissionFile: { type: DataTypes.STRING }
  });

  return Deliverable;
};
