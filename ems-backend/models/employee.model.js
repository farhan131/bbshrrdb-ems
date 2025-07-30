const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Employee = sequelize.define("Employee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  designation: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM("admin", "employee"),
    allowNull: false,
    defaultValue: "employee",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fatherName: DataTypes.STRING,
  cnic: DataTypes.STRING,
  dob: DataTypes.DATEONLY,
  gender: DataTypes.STRING,
  address: DataTypes.TEXT,
  maritalStatus: DataTypes.STRING,
  qualification: DataTypes.STRING,
  department: DataTypes.STRING,
  joiningDate: DataTypes.DATEONLY,
  profilePicture: DataTypes.STRING,
});

module.exports = Employee;