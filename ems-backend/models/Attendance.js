module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define("Attendance", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    employeeId: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    status: { type: DataTypes.ENUM("present", "absent"), allowNull: false },
  });

  return Attendance;
};
