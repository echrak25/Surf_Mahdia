const express = require('express');
const router = express.Router();
const { Server } = require('socket.io');

// Create an instance of the WebSocket server
const io = new Server();

// Handle WebSocket connections
io.on('connection', (socket) => {
  // Handle incoming messages from the client
  socket.on('message', (message) => {
    // Broadcast the message to all connected clients
    io.emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    // Perform any necessary cleanup
  });
});

// Mount the router
router.io = io;

module.exports = router;
