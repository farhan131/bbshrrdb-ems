const sequelize = require("../config/db");
const Sequelize = require("sequelize");

// Import model definitions
const EmployeeModel = require("./employee.model");
const UserModel = require("./user.model");
const DeliverableModel = require("./deliverable.model");
const AttendanceModel = require("./attendance.model");
const DocumentModel = require("./document.model");
const ExplanationModel = require("./explanation.model");
const LeaveModel = require("./leave.model");
const MessageModel = require("./message.model");
const ShowCauseModel = require("./showCause.model");
const TaskModel = require("./task.model");
const TrainingModel = require("./training.model");
const TransferPostingModel = require("./transferPosting.model");

// Initialize models
const Employee = EmployeeModel(sequelize, Sequelize.DataTypes);
const User = UserModel(sequelize, Sequelize.DataTypes);
const Deliverable = DeliverableModel(sequelize, Sequelize.DataTypes);
const Attendance = AttendanceModel(sequelize, Sequelize.DataTypes);
const Document = DocumentModel(sequelize, Sequelize.DataTypes);
const Explanation = ExplanationModel(sequelize, Sequelize.DataTypes);
const Leave = LeaveModel(sequelize, Sequelize.DataTypes);
const Message = MessageModel(sequelize, Sequelize.DataTypes);
const ShowCause = ShowCauseModel(sequelize, Sequelize.DataTypes);
const Task = TaskModel(sequelize, Sequelize.DataTypes);
const Training = TrainingModel(sequelize, Sequelize.DataTypes);
const TransferPosting = TransferPostingModel(sequelize, Sequelize.DataTypes);

// Define associations
User.hasMany(Deliverable, { foreignKey: "assignedTo" });
Deliverable.belongsTo(User, { foreignKey: "assignedTo" });

// Sync DB
const syncDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected...");
    await sequelize.sync({ alter: true });
    console.log("Models synced...");
  } catch (err) {
    console.error("DB sync error:", err);
  }
};

module.exports = {
  sequelize,
  syncDb,
  Employee,
  User,
  Deliverable,
};
