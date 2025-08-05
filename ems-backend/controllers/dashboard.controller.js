const { Task, Announcement, Employee, Attendance } = require("../models");

exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    const daysWorked = await Attendance.count({
      where: { employeeId: userId, status: "present" },
    });

    const leaveBalance = 15; // static or fetch from leave table
    const pendingTasks = await Task.count({
      where: { assignedTo: userId, status: "pending" },
    });

    const user = await Employee.findByPk(userId);
    const teamMembers = await Employee.count({
      where: { department: user.department },
    });

    res.json({ daysWorked, leaveBalance, pendingTasks, teamMembers });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

exports.getUpcomingTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { assignedTo: req.user.id },
      order: [["dueDate", "ASC"]],
      limit: 5,
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Employee.findAll({
      attributes: ["id", "name", "email", "role"],
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findAll({
      where: { employeeId: req.user.id },
      attributes: ["date", "status"],
      order: [["date", "DESC"]],
      limit: 10,
    });

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
};
