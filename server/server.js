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
  
  if (!roomId) return; // safety
  
  // Create room if it doesn't exist
  if (!rooms[roomId]) {
    rooms[roomId] = {
      users: {},
      takenSeats: []
    };
  }
  
  // Add user with basic info (seat, name, character to be filled later)
  rooms[roomId].users[socket.id] = {
    id: socket.id,
    cameraRotation: { x: 0, y: 0 }
  };
  
  socket.join(roomId);
  
  // Handle joinRoom: attach name and character
  socket.on('joinRoom', ({ name, character }) => {
    if (rooms[roomId]?.users[socket.id]) {
      rooms[roomId].users[socket.id].name = name;
      rooms[roomId].users[socket.id].character = character;
      
      // Immediately update all users after character selection
      const usersInRoom = Object.values(rooms[roomId].users);
      io.in(roomId).emit('updateUsers', usersInRoom);
    }
  });
  
  // Handle seat assignment
  socket.on('requestSeat', () => {
    const availableSeats = Array.from({ length: 20 }, (_, i) => i)
      .filter(seatIndex => !rooms[roomId].takenSeats.includes(seatIndex));
    
    if (availableSeats.length > 0) {
      const assignedSeat = availableSeats[0];
      rooms[roomId].takenSeats.push(assignedSeat);
      rooms[roomId].users[socket.id].seatIndex = assignedSeat;
      
      socket.emit('seatAssigned', { seatIndex: assignedSeat });
      
      const usersInRoom = Object.values(rooms[roomId].users);
      io.in(roomId).emit('updateUsers', usersInRoom);
    } else {
      socket.emit('roomFull');
    }
  });
  
  // Handle camera rotation updates
  socket.on('cameraUpdate', (data) => {
    if (rooms[roomId]?.users[socket.id]) {
      rooms[roomId].users[socket.id].cameraRotation = data.rotation;
    }
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    if (rooms[roomId]?.users[socket.id]) {
      const seatIndex = rooms[roomId].users[socket.id].seatIndex;
      if (seatIndex !== undefined) {
        rooms[roomId].takenSeats = rooms[roomId].takenSeats.filter(seat => seat !== seatIndex);
      }
      
      delete rooms[roomId].users[socket.id];
      
      const usersInRoom = Object.values(rooms[roomId].users);
      io.in(roomId).emit('updateUsers', usersInRoom);
      
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