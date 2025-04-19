// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const rooms = {};

io.on('connection', (socket) => {
  const { roomId } = socket.handshake.query;
  
  // Create room if it doesn't exist
  if (!rooms[roomId]) {
    rooms[roomId] = {
      users: {},
      takenSeats: []
    };
  }
  
  // Add user to the room (without seat assignment initially)
  rooms[roomId].users[socket.id] = {
    id: socket.id,
    cameraRotation: { x: 0, y: 0 }
  };
  
  // Join the socket room
  socket.join(roomId);
  
  // Handle seat assignment request
  socket.on('requestSeat', () => {
    const availableSeats = Array.from({ length: 20 }, (_, i) => i)  // Assuming max 20 seats
      .filter(seatIndex => !rooms[roomId].takenSeats.includes(seatIndex));
    
    if (availableSeats.length > 0) {
      // Assign first available seat
      const assignedSeat = availableSeats[0];
      rooms[roomId].takenSeats.push(assignedSeat);
      rooms[roomId].users[socket.id].seatIndex = assignedSeat;
      
      // Tell the user which seat they got
      socket.emit('seatAssigned', { seatIndex: assignedSeat });
      
      // Update all users about the new seating arrangement
      const usersInRoom = Object.values(rooms[roomId].users);
      io.in(roomId).emit('updateUsers', usersInRoom);
    } else {
      // Room is full
      socket.emit('roomFull');
    }
  });
  
  // Handle camera rotation updates
  socket.on('cameraUpdate', (data) => {
    if (rooms[roomId] && rooms[roomId].users[socket.id]) {
      rooms[roomId].users[socket.id].cameraRotation = data.rotation;
      // You could broadcast this to other users if you want to show head movement
    }
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    if (rooms[roomId] && rooms[roomId].users[socket.id]) {
      // Free up the seat
      const seatIndex = rooms[roomId].users[socket.id].seatIndex;
      if (seatIndex !== undefined) {
        rooms[roomId].takenSeats = rooms[roomId].takenSeats.filter(seat => seat !== seatIndex);
      }
      
      // Remove user
      delete rooms[roomId].users[socket.id];
      
      // Update other users
      const usersInRoom = Object.values(rooms[roomId].users);
      io.in(roomId).emit('updateUsers', usersInRoom);
      
      // Clean up empty rooms
      if (Object.keys(rooms[roomId].users).length === 0) {
        delete rooms[roomId];
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});