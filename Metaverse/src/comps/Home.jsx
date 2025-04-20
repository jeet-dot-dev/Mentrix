import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRoomCode } from '../utils/roomUtils';

function Home() {
  const [joinCode, setJoinCode] = useState('');
  const [name, setName] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const navigate = useNavigate();

  const characters = [
    { id: 'character1', name: 'Student1', image: 'https://res.cloudinary.com/dhdmbwnak/image/upload/v1745084597/Screenshot_2025-04-19_231245_tj1brw.png' },
    { id: 'character2', name: 'Student2', image: 'https://res.cloudinary.com/dhdmbwnak/image/upload/v1745084597/Screenshot_2025-04-19_231152_s1kt1t.png' },
    { id: 'character3', name: 'Student3', image: 'https://res.cloudinary.com/dhdmbwnak/image/upload/v1745084597/Screenshot_2025-04-19_231226_zh9ysk.png' },
  ];

  const handleCreateRoom = () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!selectedCharacter) {
      alert('Please select a character');
      return;
    }
    
    const roomCode = generateRoomCode();
    navigate(`/room/${roomCode}`, { 
      state: { userName: name, character: selectedCharacter } 
    });
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!selectedCharacter) {
      alert('Please select a character');
      return;
    }
    
    if (joinCode.trim()) {
      navigate(`/room/${joinCode}`, { 
        state: { userName: name, character: selectedCharacter } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Virtual Classroom
        </h1>
        
        <div className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              required
            />
          </div>
          
          {/* Character Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Choose Character
            </label>
            <div className="grid grid-cols-3 gap-3">
              {characters.map((character) => (
                <div
                  key={character.id}
                  onClick={() => setSelectedCharacter(character.id)}
                  className={`cursor-pointer border rounded-lg p-2 flex flex-col items-center justify-center transition ${
                    selectedCharacter === character.id
                      ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-16 h-16 rounded-full mb-2"
                  />
                  <span className="text-sm font-medium">{character.name}</span>
                </div>
              ))}
            </div>
          </div>
          
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