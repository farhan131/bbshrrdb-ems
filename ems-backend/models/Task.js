module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    status: DataTypes.STRING,
    assignedTo: DataTypes.INTEGER,
  });

  return Task;
};
