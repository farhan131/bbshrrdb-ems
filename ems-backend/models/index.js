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
// const TrainingModel = require("./training.model");
const TransferPostingModel = require("./transferPosting.model");

// Initialize models
const Employee = EmployeeModel(sequelize, Sequelize.DataTypes);
const User = UserModel(sequelize, Sequelize.DataTypes);

const Deliverable = DeliverableModel(sequelize, Sequelize.DataTypes);
User.hasMany(Deliverable, { foreignKey: "assignedTo" });
Deliverable.belongsTo(User, { foreignKey: "assignedTo" });

const Attendance = AttendanceModel(sequelize, Sequelize.DataTypes);
Attendance.belongsTo(Employee, { foreignKey: "employeeId" });
Employee.hasMany(Attendance, { foreignKey: "employeeId" });

const Document = DocumentModel(sequelize, Sequelize.DataTypes);
User.hasMany(Document, { foreignKey: "userId" });
Document.belongsTo(User, { foreignKey: "userId" });

const Explanation = ExplanationModel(sequelize, Sequelize.DataTypes);
Employee.hasMany(Explanation, { foreignKey: "employeeId" });
Explanation.belongsTo(Employee, { foreignKey: "employeeId" });

const Leave = LeaveModel(sequelize, Sequelize.DataTypes);
Employee.hasMany(Leave, { foreignKey: "employeeId" });
Leave.belongsTo(Employee, { foreignKey: "employeeId" });

const Message = MessageModel(sequelize, Sequelize.DataTypes);
User.hasMany(Message, { as: "SentMessages", foreignKey: "senderId" });
User.hasMany(Message, { as: "ReceivedMessages", foreignKey: "receiverId" });
Message.belongsTo(User, { as: "Sender", foreignKey: "senderId" });
Message.belongsTo(User, { as: "Receiver", foreignKey: "receiverId" });

const ShowCause = ShowCauseModel(sequelize, Sequelize.DataTypes);
Employee.hasMany(ShowCause, { foreignKey: "employeeId" });
ShowCause.belongsTo(Employee, { foreignKey: "employeeId" });

const Task = TaskModel(sequelize, Sequelize.DataTypes);
Employee.hasMany(Task, { foreignKey: "assignedTo" });
Task.belongsTo(Employee, { foreignKey: "assignedTo" });

// const Training = TrainingModel(sequelize, Sequelize.DataTypes);
const TransferPosting = TransferPostingModel(sequelize, Sequelize.DataTypes);
Employee.hasMany(TransferPosting, { foreignKey: "employeeId" });
TransferPosting.belongsTo(Employee, { foreignKey: "employeeId" });

// Sync DB
const syncDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected...");
    // await sequelize.sync({ force: true });
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
