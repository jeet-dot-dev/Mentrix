// src/comps/EnvironmentComp.jsx
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Classroom } from "../models/Classroom";
import { Student1 } from "../models/Student1";
import { useEffect, useState } from "react";

export default function EnvironmentComp({ users, socket }) {
  const [userPositions, setUserPositions] = useState({});

  useEffect(() => {
    if (!socket) return;

    // Listen for position updates from other users
    socket.on('updatePosition', (data) => {
      setUserPositions(prev => ({
        ...prev,
        [data.userId]: data.position
      }));
    });

    // Send position updates
    const interval = setInterval(() => {
      // In a real implementation, you'd get the actual position of the user's avatar
      socket.emit('positionUpdate', {
        position: { x: 0, y: 0, z: 0 },
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [socket]);

  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={1} color={"white"} />
      <directionalLight position={[0, 5, 0]} intensity={1} castShadow />
      <pointLight position={[0, 10, 10]} intensity={1} color={"white"} />
      <Classroom position={[0, 0, 0]} rotation={[0, Math.PI, 0]} />
      
      {/* Render all users */}
      {users.map((user) => (
        <Student1 
          key={user.id} 
          position={userPositions[user.id] || [Math.random() * 4 - 2, 0, Math.random() * 4 - 2]} 
          userId={user.id}
        />
      ))}
    </Canvas>
  );
}