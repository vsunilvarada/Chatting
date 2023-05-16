// server.js

const express = require('express');
const serverless = require('serverless-http');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handling chat messages
  socket.on('chat message', (message) => {
    console.log('Message:', message);
    io.emit('chat message', message); // Broadcast the message to all connected clients
  });

  // Handling disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

module.exports = app;
module.exports.handler = serverless(app)


// Start the server
const port = 3000;
http.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
