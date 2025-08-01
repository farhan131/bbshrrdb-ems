module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define("Leave", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    reason: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
  });

  return Leave;
};
