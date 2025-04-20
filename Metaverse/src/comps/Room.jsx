import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Copy, Check } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

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

      // Send user info to server
      newSocket.emit('joinRoom', {
        name: state.userName,
        character: state.character,
      });

      newSocket.emit('requestSeat');
    });

    newSocket.on('seatAssigned', (seatData) => {
      setMySeatIndex(seatData.seatIndex);
    });

    newSocket.on('updateUsers', (updatedUsers) => {
      setUsers(updatedUsers);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [roomId, state, navigate]);

  // Update local user information in the users array
  useEffect(() => {
    if (mySeatIndex >= 0 && character && userName) {
      setUsers(prevUsers => {
        const updatedUsers = [...prevUsers];
        const myUserIndex = updatedUsers.findIndex(u => u.seatIndex === mySeatIndex);
  
        if (myUserIndex >= 0) {
          updatedUsers[myUserIndex] = {
            ...updatedUsers[myUserIndex],
            name: userName,
            character: character
          };
        } else {
          updatedUsers.push({
            id: 'local-user',
            name: userName,
            character: character,
            seatIndex: mySeatIndex
          });
        }
  
        return updatedUsers;
      });
    }
  }, [mySeatIndex, character, userName]);
  
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleInfo = () => {
    setShowInfo(prev => !prev);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-gray-900">
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 z-20 w-full bg-gray-800 bg-opacity-80 text-white p-3 flex justify-between items-center shadow-lg backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold">VR Room</h2>
          <div className="flex items-center bg-gray-700 rounded-md px-3 py-1">
            <span className="mr-2 text-gray-300">Room ID:</span>
            <span className="font-mono">{roomId}</span>
            <button 
              onClick={copyRoomId} 
              className="ml-2 p-1 hover:bg-gray-600 rounded-md transition-colors"
              title="Copy Room ID"
            >
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'} text-sm font-medium flex items-center`}>
            <span className="w-2 h-2 rounded-full bg-white mr-2"></span>
            {connected ? 'Connected' : 'Connecting...'}
          </div>
          <button 
            onClick={toggleInfo}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md transition-colors"
          >
            {showInfo ? 'Hide Info' : 'Show Info'}
          </button>
          <button 
            onClick={() => navigate('/')}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md transition-colors"
          >
            Leave Room
          </button>
        </div>
      </div>

      {/* User Info Panel */}
      {showInfo && (
        <div className="absolute top-16 left-4 z-10 p-4 bg-gray-800 bg-opacity-75 backdrop-blur-sm text-white rounded-lg shadow-lg max-w-xs transition-all">
          <div className="border-b border-gray-600 pb-2 mb-2">
            <h3 className="font-bold text-lg">Your Profile</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">Name:</span>
              <span className="font-medium">{userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Character:</span>
              <span className="font-medium">{character}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Seat:</span>
              <span className="font-medium">{mySeatIndex >= 0 ? `#${mySeatIndex + 1}` : 'Not assigned'}</span>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-600 pt-2">
            <h3 className="font-bold mb-2">Other Users ({users.length - 1 >= 0 ? users.length - 1 : 0})</h3>
            <div className="max-h-40 overflow-y-auto">
              {users.filter(user => user.id !== 'local-user').map((user, index) => (
                <div key={user.id || index} className="flex justify-between items-center py-1 border-b border-gray-700 last:border-0">
                  <span>{user.name}</span>
                  <span className="text-sm text-gray-400">Seat #{user.seatIndex + 1}</span>
                </div>
              ))}
              {users.filter(user => user.id !== 'local-user').length === 0 && (
                <p className="text-sm text-gray-400 italic">No other users in the room</p>
              )}
            </div>
          </div>
        </div>
      )}

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