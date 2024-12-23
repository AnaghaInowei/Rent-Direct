const Message = require('../models/Message');

// Send a message
exports.sendMessage = async (req, res) => {
  const { receiverId, propertyId, content } = req.body;

  try {
    const newMessage = new Message({
      senderId: req.user.id,
      receiverId,
      propertyId,
      content,
    });

    await newMessage.save();
    
    // Trigger notification for the receiver
    const messageText = 'You have a new message about a property.';
    const linkToChat = `/messages/${req.user.id}`;
    await createNotification(receiverId, messageText, linkToChat);

    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};

// Get conversation messages
exports.getMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, receiverId: userId },
        { senderId: userId, receiverId: req.user.id },
      ],
    }).sort({ timestamp: 1 }); // Sort by oldest first

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};

// Mark a message as read
exports.markAsRead = async (req, res) => {
  const { messageId } = req.params;

  try {
    await Message.findByIdAndUpdate(messageId, { isRead: true });
    res.status(200).json({ message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking message as read', error });
  }
};
