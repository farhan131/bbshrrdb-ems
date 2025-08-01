// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const {authenticate} = require('../middleware/auth.middleware');

router.use(authenticate);

router.get('/stats', dashboardController.getStats);
router.get('/tasks', dashboardController.getUpcomingTasks);
router.get('/announcements', dashboardController.getAnnouncements);
router.get('/users', dashboardController.getUsers);

module.exports = router;
