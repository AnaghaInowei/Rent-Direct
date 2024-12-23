const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, markAsRead } = require('../controllers/messageController');
const authenticate = require('../middleware/authenticate'); // Protect routes

// Send a message
router.post('/send', authenticate, sendMessage);

// Get conversation messages between two users
router.get('/conversations/:userId', authenticate, getMessages);

// Mark messages as read
router.put('/read/:messageId', authenticate, markAsRead);

module.exports = router;
