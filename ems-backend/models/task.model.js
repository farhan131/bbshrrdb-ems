// models/task.model.js
module.exports = (sequelize, DataTypes) => {
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

  return Task;
};
