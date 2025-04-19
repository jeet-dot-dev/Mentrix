const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms = {};

io.on("connection", (socket) => {
  const { roomId } = socket.handshake.query;
  console.log(`User connected: ${socket.id} to room: ${roomId}`);
  console.log(rooms);
  // create a new room if it doesn't exist
  if (!rooms[roomId]) {
    rooms[roomId] = {
      users: [],
    };
  }
    // add the user to the room
    rooms[roomId].users[socket.id]={
        id: socket.id,
        position : { x: 0, y: 0,z: 0 },
    }

    //join the room
    socket.join(roomId);
    
    //notify other users in the room that a new user has joined
    socket.to(roomId).emit('userJoined', rooms[roomId].users[socket.id]);

     console.log(rooms);
      // Send all current users to the new user
  const usersInRoom = Object.values(rooms[roomId].users);
  socket.emit('updateUsers', usersInRoom);
  
  // Handle position updates
  socket.on('positionUpdate', (data) => {
    if (rooms[roomId] && rooms[roomId].users[socket.id]) {
      rooms[roomId].users[socket.id].position = data.position;
      socket.to(roomId).emit('updatePosition', {
        userId: socket.id,
        position: data.position
      });
    }
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    if (rooms[roomId]) {
      delete rooms[roomId].users[socket.id];
      socket.to(roomId).emit('userLeft', socket.id);
      
      // Clean up empty rooms
      if (Object.keys(rooms[roomId].users).length === 0) {
        delete rooms[roomId];
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
