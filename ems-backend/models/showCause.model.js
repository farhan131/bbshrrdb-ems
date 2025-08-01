module.exports = (sequelize, DataTypes) => {
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

  return ShowCause;
};
