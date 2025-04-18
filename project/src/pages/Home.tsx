import React, { useState } from 'react';
import { Users, PlusCircle } from 'lucide-react';
import RoomCard from '../components/home/RoomCard';
import CreateRoomModal from '../components/home/CreateRoomModal';
import JoinRoomModal from '../components/home/JoinRoomModal';
import { mockRooms } from '../utils/mockData';
import { Room } from '../types';

const Home: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  
  const handleCreateRoom = (roomName: string, roomType: string) => {
    // Generate a random 6-character code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const newRoom = {
      id: Date.now().toString(),
      code,
      name: roomName,
      type: roomType,
      createdBy: "Current User", // In a real app, this would be the current user's ID
      participants: 1
    };
    
    setRooms([...rooms, newRoom]);
    setShowCreateModal(false);
    
    // Show success message
    alert(`Room created successfully! Your room code is: ${code}`);
  };
  
  const handleJoinRoom = (roomCode: string) => {
    const room = rooms.find(r => r.code === roomCode);
    
    if (room) {
      // In a real app, this would redirect to the room or update participant count
      alert(`Successfully joined room: ${room.name}`);
    } else {
      alert("Room not found. Please check your code and try again.");
    }
    
    setShowJoinModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Welcome to EduTest
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create or join virtual classrooms for interactive learning and testing. 
          Connect with teachers and students in real-time educational environments.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        <RoomCard
          title="Create a Room"
          description="Start a new virtual classroom for your students or study group"
          icon={<PlusCircle className="h-8 w-8 text-blue-600" />}
          buttonText="Create Room"
          onClick={() => setShowCreateModal(true)}
        />
        
        <RoomCard
          title="Join a Room"
          description="Enter a room code to join an existing classroom session"
          icon={<Users className="h-8 w-8 text-blue-600" />}
          buttonText="Join Room"
          onClick={() => setShowJoinModal(true)}
        />
      </div>
      
      {rooms.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map(room => (
              <div key={room.id} className="bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {room.type}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  <p>Code: <span className="font-mono font-medium">{room.code}</span></p>
                  <p className="flex items-center mt-1">
                    <Users className="h-4 w-4 mr-1" />
                    {room.participants} participants
                  </p>
                </div>
                <button 
                  className="w-full mt-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                  onClick={() => handleJoinRoom(room.code)}
                >
                  Enter Room
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <CreateRoomModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        onCreateRoom={handleCreateRoom} 
      />
      
      <JoinRoomModal 
        isOpen={showJoinModal} 
        onClose={() => setShowJoinModal(false)} 
        onJoinRoom={handleJoinRoom} 
      />
    </div>
  );
};

export default Home;