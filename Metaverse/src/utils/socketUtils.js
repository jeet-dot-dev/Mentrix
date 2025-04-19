// src/utils/socketUtils.js
import io from 'socket.io-client';

export const initializeSocket = (roomId) => {
  const socket = io('http://localhost:3000', {  // Added 'http://' to the URL
    query: { roomId }
  });
  
  return socket;
};