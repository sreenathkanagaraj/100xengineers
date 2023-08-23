const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('userJoined', (username) => {
    // Broadcast the new user to all connected clients
    socket.broadcast.emit('userJoined', username);
  });

  // Other event listeners as needed
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
