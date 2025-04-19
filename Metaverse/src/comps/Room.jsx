// src/comps/Room.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EnvironmentComp from './EnvironmentComp';
import { initializeSocket } from '../utils/socketUtils';

// Predefined seating positions in the classroom
const SEAT_POSITIONS = [
  { position: [-2.5, 0.5, -1.5], rotation: [0, Math.PI, 0] },
  { position: [-1.5, 0.5, -1.5], rotation: [0, Math.PI, 0] },
  { position: [-0.5, 0.5, -1.5], rotation: [0, Math.PI, 0] },
  { position: [0.5, 0.5, -1.5], rotation: [0, Math.PI, 0] },
  { position: [-2.5, 0.5, -0.5], rotation: [0, Math.PI, 0] },
  { position: [-1.5, 0.5, -0.5], rotation: [0, Math.PI, 0] },
  { position: [-0.5, 0.5, -0.5], rotation: [0, Math.PI, 0] },
  { position: [0.5, 0.5, -0.5], rotation: [0, Math.PI, 0] },
  // Add more seat positions as needed
];

function Room() {
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [mySeatIndex, setMySeatIndex] = useState(-1);

  useEffect(() => {
    const newSocket = initializeSocket(roomId);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setConnected(true);
      console.log('Connected to the room:', roomId);
      
      // Request a seat assignment from the server
      newSocket.emit('requestSeat');
    });

    newSocket.on('seatAssigned', (seatData) => {
      setMySeatIndex(seatData.seatIndex);
      console.log(`Assigned to seat ${seatData.seatIndex}`);
    });

    newSocket.on('updateUsers', (updatedUsers) => {
      console.log('Received updated users:', updatedUsers);
      setUsers(updatedUsers);
    });

    // Clean up on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [roomId]);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Room info overlay - positioned absolutely on top */}
      <div className="absolute top-0 left-0 z-10 p-2 w-full pointer-events-none">
        <div className="bg-gray-800 bg-opacity-75 text-white p-2 rounded-md text-sm">
          <p>Room: {roomId}</p>
          <p>Status: {connected ? 'Connected' : 'Connecting...'}</p>
          <p>Users in room: {users.length}</p>
          {mySeatIndex >= 0 && <p>Your seat: #{mySeatIndex + 1}</p>}
        </div>
      </div>
      
      {/* Classroom environment - takes full viewport */}
      <div className="w-full h-full">
        <EnvironmentComp 
          users={users} 
          socket={socket}
          mySeatIndex={mySeatIndex}
          seatPositions={SEAT_POSITIONS}
        />
      </div>
    </div>
  );
}

export default Room;