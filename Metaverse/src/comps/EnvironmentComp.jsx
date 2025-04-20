// src/comps/EnvironmentComp.jsx
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  PerspectiveCamera,
  OrbitControls,
  Environment,
  Sparkles,
  Text,
  Float,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";
import { Classroom } from "../models/Classroom";
import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { Student1 } from "../models/Student1";
import { Student2 } from "../models/Student2";
import { Student3 } from "../models/Student3";
import { SceneContent } from "./SceneContent ";
import {  useFrame } from "@react-three/fiber";
import {YouTube} from "./YouTube";

// Floating name tags above users
const NameTag = ({ position, name }) => {
  return (
    <Float
      position={[position[0], position[1] + 0.5, position[2]]}
      rotation={[0, 0, 0]}
      rotationIntensity={0.2}
      floatIntensity={0.2}
    >
      <Text
        fontSize={0.15}
        color={"#4488ff"}
        anchorX="center"
        anchorY="middle"
      >
        {name || "Student"}
      </Text>
    </Float>
  );
};

// Particle system for ambient atmosphere
const ParticleField = () => {
  return (
    <Sparkles
      count={100}
      scale={[10, 5, 10]}
      size={0.5}
      speed={0.2}
      color={"#ffffcc"}
      opacity={0.2}
    />
  );
};

// First person player character


// First person player character
const PlayerCharacter = ({ seatPosition, isActive, character }) => {
  const characterRef = useRef();
  const headPosition = useMemo(() => {
    if (!seatPosition) return [0, 0, 0];
    // Adjust head position relative to seat position
    return [
      seatPosition.position[0],
      seatPosition.position[1] + 0.6, // Head height above seat
      seatPosition.position[2]
    ];
  }, [seatPosition]);

  return (
    <group ref={characterRef}>
      {isActive ? null : (
        <CharacterModel
          character={character}
          position={seatPosition?.position || [0, 0, 0]}
          rotation={seatPosition?.rotation || [0, 0, 0]}
          castShadow
        />
      )}
      {isActive && (
        <PerspectiveCamera
          makeDefault
          position={headPosition}
          rotation={seatPosition?.rotation || [0, 0, 0]}
          fov={75}
        />
      )}
    </group>
  );
};

// Character Model Component - Choose the right model based on character ID
const CharacterModel = ({ character, position, rotation, castShadow, userId }) => {
  switch(character) {
    case 'Student1':
      return <Student1 position={position} rotation={rotation} userId={userId} castShadow={castShadow} />;
    case 'Student2':
      return <Student2 position={position} rotation={rotation} userId={userId} castShadow={castShadow} />;
    case 'Student3':
      return <Student3 position={position} rotation={rotation} userId={userId} castShadow={castShadow} />;
    default:
      return <Student1 position={position} rotation={rotation} userId={userId} castShadow={castShadow} />;
  }
};

// User Character Component
const UserCharacter = ({ user, position, rotation }) => {
  // Choose the appropriate character model based on user preference
  return (
    <CharacterModel
      character={user.character}
      position={position}
      rotation={rotation}
      userId={user.id}
      castShadow
    />
  );
};

// Main Environment Component
export default function EnvironmentComp({
  users = [],
  socket,
  mySeatIndex = -1,
  seatPositions = [],
}) {
  const [cameraRotation, setCameraRotation] = useState({ x: 0, y: 0 });
  const [dayTime, setDayTime] = useState(true); // For day/night cycle
  const [firstPersonView, setFirstPersonView] = useState(true); // Default to first-person
  const controlsRef = useRef();
  const directionalLightRef = useRef();
  
  // Toggle view mode
  const toggleViewMode = () => {
    setFirstPersonView(prev => !prev);
  };

  // Update camera rotation for the server
  useEffect(() => {
    if (!socket || mySeatIndex < 0) return;

    const interval = setInterval(() => {
      if (controlsRef.current) {
        const newRotation = {
          x: controlsRef.current.getAzimuthalAngle(),
          y: controlsRef.current.getPolarAngle(),
        };

        // Only emit if rotation changed significantly
        if (
          Math.abs(newRotation.x - cameraRotation.x) > 0.01 ||
          Math.abs(newRotation.y - cameraRotation.y) > 0.01
        ) {
          setCameraRotation(newRotation);
          if (socket && socket.emit) {
            socket.emit("cameraUpdate", { rotation: newRotation });
          }
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [socket, mySeatIndex, cameraRotation]);

  // Keyboard event handler for view toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Press V to toggle view mode
      if (e.key === "v") {
        toggleViewMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const mySeatPosition = useMemo(() => {
    return mySeatIndex >= 0 && seatPositions[mySeatIndex] ? seatPositions[mySeatIndex] : null;
  }, [mySeatIndex, seatPositions]);

  // Find my character from users array using mySeatIndex
  const myUser = useMemo(() => {
    return users.find(user => user.seatIndex === mySeatIndex) || {};
  }, [users, mySeatIndex]);

  // Access the character property from myUser
  const myCharacter = myUser.character || "Student1";

  return (
    <>
      <Canvas shadows className="w-full h-full">
        <SceneContent 
          mySeatIndex={mySeatIndex} 
          seatPositions={seatPositions} 
          dayTime={dayTime} 
          users={users} 
          controlsRef={controlsRef}
          directionalLightRef={directionalLightRef}
          firstPersonView={firstPersonView}
          mySeatPosition={mySeatPosition}
          myCharacter={myCharacter}
          ParticleField={ParticleField}
          UserCharacter={UserCharacter}
          NameTag={NameTag}
          PlayerCharacter={PlayerCharacter}
          YouTube={YouTube}
        />
      </Canvas>

      {/* Controls help UI */}
      <div className="fixed bottom-4 left-4 bg-gray-800 bg-opacity-70 text-white px-3 py-2 rounded-md text-sm">
        <p>Mouse: Look around | Scroll: Zoom | V: Toggle View</p>
      </div>

      {/* Room status indicator */}
      <div className="fixed top-4 right-4 flex items-center space-x-2 bg-gray-800 bg-opacity-70 text-white px-3 py-2 rounded-md">
        <span
          className={`inline-block w-3 h-3 rounded-full ${
            dayTime ? "bg-yellow-300" : "bg-blue-400"
          }`}
        ></span>
        <p className="text-sm">{dayTime ? "Day Mode" : "Night Mode"}</p>
      </div>
      
      {/* View mode indicator */}
      <div className="fixed top-4 left-4 bg-gray-800 bg-opacity-70 text-white px-3 py-2 rounded-md">
        <p className="text-sm">
          {firstPersonView ? "First-Person View" : "Free Camera"}
        </p>
      </div>
    </>
  );
}

// Export the shared components for use in SceneContent
export { NameTag, ParticleField, UserCharacter, CharacterModel, PlayerCharacter, YouTube };