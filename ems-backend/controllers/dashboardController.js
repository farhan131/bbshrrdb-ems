// controllers/dashboardController.js
const { User, Task, Attendance, Leave } = require('../models');
const { Op } = require('sequelize');

exports.getStats = async (req, res) => {
  const user = req.user;

  try {
    if (user.role === 'employee') {
      const daysWorked = await Attendance.count({ where: { userId: user.id } });
      const leaveBalance = 15; // Assume fixed for now or fetch from user table
      const pendingTasks = await Task.count({ where: { userId: user.id, status: 'pending' } });
      const teamMembers = await User.count({ where: { department: user.department } });

      return res.json({ daysWorked, leaveBalance, pendingTasks, teamMembers });
    }

    if (user.role === 'admin') {
      const totalEmployees = await User.count({ where: { role: 'employee' } });
      const tasksAssigned = await Task.count();
      const pendingLeaves = await Leave.count({ where: { status: 'pending' } });
      const departments = await User.aggregate('department', 'count', { distinct: true });

      return res.json({ totalEmployees, tasksAssigned, pendingLeaves, departments });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
};

exports.getUpcomingTasks = async (req, res) => {
  const user = req.user;
  const where = user.role === 'employee' ? { userId: user.id } : {};

  try {
    const tasks = await Task.findAll({
      where,
      limit: 5,
      order: [['dueDate', 'ASC']],
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

const { Announcement } = require('../models');

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
    });

    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching announcements' });
  }
};

exports.getUsers = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role'],
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};
