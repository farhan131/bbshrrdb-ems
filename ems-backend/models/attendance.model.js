module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define("Attendance", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    status: {
      type: DataTypes.ENUM('present', 'absent', 'leave'),
      allowNull: false,
      defaultValue: 'present'
    }
  });

  return Attendance;
};
