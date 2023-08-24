const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("userJoined", (username) => {
    // Broadcast the new user to all connected clients
    socket.broadcast.emit("userJoined", username);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("chat message", (message) => {
    // Other event listeners as needed
    io.emit("chat message", message); // Broadcast the message to all connected clients
  });

  socket.on("send button", () => {
    console.log("auto clear");
  });
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
