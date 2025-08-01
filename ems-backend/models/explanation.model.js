module.exports = (sequelize, DataTypes) => {
  const Explanation = sequelize.define("Explanation", {
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

  return Explanation;
};
