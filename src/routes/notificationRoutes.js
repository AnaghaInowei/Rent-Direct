const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead } = require('../controllers/notificationController');
const authenticate = require('../middleware/authenticate');

// Get notifications for a user
router.get('/', authenticate, getNotifications);

// Mark notification as read
router.put('/:notificationId/read', authenticate, markAsRead);

module.exports = router;
