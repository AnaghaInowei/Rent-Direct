// require('dotenv').config();
// const express = require('express');

// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to Rent Direct API');
});

export default app;

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const messageRoutes = require('./routes/messageRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const http = require('http');
const { Server } = require('socket.io');
// const app = express();

dotenv.config();
connectDB();

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);

const server = http.createServer(app);
const io = new Server(server);

// Socket connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for notifications
  socket.on('sendNotification', ({ receiverId, message }) => {
    if (receiverId) {
      io.to(receiverId).emit('newNotification', message);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

