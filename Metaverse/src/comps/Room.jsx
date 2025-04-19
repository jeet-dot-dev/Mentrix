// src/comps/Room.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EnvironmentComp from './EnvironmentComp';
import { initializeSocket } from '../utils/socketUtils';

function Room() {
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = initializeSocket(roomId);
    setSocket(newSocket);
    console.log('Socket initialized:', newSocket);
    newSocket.on('connect', () => {
      setConnected(true);
      console.log('Connected to the room:', roomId);
    });

    newSocket.on('userJoined', (userData) => {
      setUsers((prevUsers) => [...prevUsers, userData]);
    });

    newSocket.on('userLeft', (userId) => {
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
    });

    newSocket.on('updateUsers', (updatedUsers) => {
      setUsers(updatedUsers);
    });

    // Clean up on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [roomId]);
console.log('Users in room:', users);
  console.log('Connected:', connected);
  console.log('Socket:', socket); 
  return (
    <div className="room-container">
      <div className="room-info">
        <h2>Room: {roomId}</h2>
        <p>Status: {connected ? 'Connected' : 'Connecting...'}</p>
        <p>Users in room: {users.length}</p>
      </div>
      
      <div className="classroom-environment">
        <EnvironmentComp users={users} socket={socket} />
      </div>
    </div>
  );
}

export default Room;