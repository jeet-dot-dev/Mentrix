// src/comps/Room.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import EnvironmentComp from './EnvironmentComp';
import { initializeSocket } from '../utils/socketUtils';

const SEAT_POSITIONS = [
  { position: [-0.8, 0.2, 1.9], rotation: [0, -Math.PI / 2, 0] },
  { position: [-0.8, 0.2, -1.8], rotation: [0, -Math.PI / 2, 0] },
  { position: [-0.8, 0.2, 0], rotation: [0, -Math.PI / 2, 0] },
];

function Room() {
  const { roomId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [mySeatIndex, setMySeatIndex] = useState(-1);
  const [userName, setUserName] = useState('');
  const [character, setCharacter] = useState('');

  useEffect(() => {
    // Redirect if state is missing (user refreshes or comes directly)
    if (!state?.userName || !state?.character) {
      navigate('/');
      return;
    }

    setUserName(state.userName);
    setCharacter(state.character);

    const newSocket = initializeSocket(roomId);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setConnected(true);
      console.log('Connected to the room:', roomId);

      // Send user info to server
      newSocket.emit('joinRoom', {
        name: state.userName,
        character: state.character,
      });

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

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [roomId, state, navigate]);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10 p-2 w-full pointer-events-none">
        <div className="bg-gray-800 bg-opacity-75 text-white p-2 rounded-md text-sm">
          <p>Room: {roomId}</p>
          <p>Status: {connected ? 'Connected' : 'Connecting...'}</p>
          <p>Users in room: {users.length}</p>
          {userName && <p>Name: {userName}</p>}
          {character && <p>Character: {character}</p>}
          {mySeatIndex >= 0 && <p>Your seat: #{mySeatIndex + 1}</p>}
        </div>
      </div>

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
