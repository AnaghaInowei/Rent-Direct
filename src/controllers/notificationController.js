const Notification = require('../models/Notification');

// Get notifications for a user
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  const { notificationId } = req.params;

  try {
    await Notification.findByIdAndUpdate(notificationId, { isRead: true });
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking notification as read', error });
  }
};
