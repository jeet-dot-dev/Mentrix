// src/comps/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRoomCode } from '../utils/roomUtils';

function Home() {
  const [joinCode, setJoinCode] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const roomCode = generateRoomCode();
    navigate(`/room/${roomCode}`);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (joinCode.trim()) {
      navigate(`/room/${joinCode}`);
    }
  };

  return (
    <div className="home-container">
      <h1>Virtual Classroom</h1>
      
      <div className="buttons-container">
        <button onClick={handleCreateRoom} className="create-btn">
          Create Room
        </button>
        
        <div className="join-container">
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="Enter Room Code"
              required
            />
            <button type="submit" className="join-btn">
              Join Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;