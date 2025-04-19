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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Virtual Classroom
        </h1>
        
        <div className="space-y-6">
          <button 
            onClick={handleCreateRoom} 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition duration-200 shadow-md"
          >
            Create Room
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-gray-500">
              <span className="bg-white px-3 text-sm">or join existing</span>
            </div>
          </div>
          
          <form onSubmit={handleJoinRoom} className="space-y-4">
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="Enter Room Code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 py-3 rounded-lg font-medium transition duration-200"
            >
              Join Room
            </button>
          </form>
        </div>
      </div>
      
      <p className="mt-6 text-sm text-gray-500">
        Connect with your classroom virtually, anywhere.
      </p>
    </div>
  );
}

export default Home;