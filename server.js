// server.js

// Import required dependencies
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Create Express app
const app = express();

// Create HTTP server using the Express app
const server = http.createServer(app);

// Create Socket.IO instance by passing the HTTP server
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle socket connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle custom events
  socket.on('chat message', (message) => {
    console.log('Received message:', message);
    
    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Define routes for your API
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
