// src/comps/EnvironmentComp.jsx
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  Environment,
  Sparkles,
  Text,
  Float,
  ContactShadows,
} from "@react-three/drei";
import { Classroom } from "../models/Classroom";
import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import * as THREE from "three";
import { Student1 } from "../models/Student1";
// Import other character models here
import { Student2 } from "../models/Student2";
import { Student3 } from "../models/Student3";

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
const PlayerCharacter = ({ seatPosition, isActive, character = "student1" }) => {
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
        <Student1
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

// User Character Component
const UserCharacter = ({ user, position, rotation }) => {
  // Choose the appropriate character model based on user preference
  // This is where you would render different character models based on the character prop
  return (
    <Student1
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
  myCharacter = "student1" // Add character prop
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

// Scene content component to avoid render issues
const SceneContent = ({ 
  mySeatIndex, 
  seatPositions, 
  dayTime, 
  users, 
  controlsRef,
  directionalLightRef,
  firstPersonView,
  mySeatPosition,
  myCharacter
}) => {
  return (
    <>
      {/* In first-person view, we use PlayerCharacter with camera, otherwise use OrbitControls */}
      {firstPersonView ? (
        <PlayerCharacter 
          seatPosition={mySeatPosition} 
          isActive={true}
          character={myCharacter}
        />
      ) : (
        <>
          {mySeatIndex >= 0 && seatPositions[mySeatIndex] && (
            <PerspectiveCamera
              makeDefault
              position={[
                seatPositions[mySeatIndex].position[0],
                seatPositions[mySeatIndex].position[1] + 2,
                seatPositions[mySeatIndex].position[2] + 2
              ]}
              rotation={[0, 0, 0]}
              fov={75}
            />
          )}
        </>
      )}

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={!firstPersonView} // Disable zoom in first-person mode
        maxPolarAngle={Math.PI - 0.2}
        minPolarAngle={0.2}
        maxDistance={5}
        minDistance={0.5}
        enabled={!firstPersonView} // Disable controls in first-person mode
      />

      {/* Lighting setup */}
      <ambientLight
        intensity={dayTime ? 0.5 : 0.2}
        color={dayTime ? "white" : "#113366"}
      />
      <directionalLight
        ref={directionalLightRef}
        position={[5, 10, 5]}
        intensity={dayTime ? 1 : 0.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight
        position={[0, 3, 0]}
        intensity={dayTime ? 0.5 : 1}
        color={dayTime ? "white" : "#5588ff"}
      />

      {/* Environment preset for better lighting */}
      <Environment preset={dayTime ? "city" : "night"} background={false} />

      <Suspense fallback={null}>
        {/* Classroom environment */}
        <Classroom
          position={[0, 0, 0]}
          rotation={[0, Math.PI, 0]}
          castShadow
          receiveShadow
        />

        {/* Floor shadow for better grounding */}
        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.6}
          scale={15}
          blur={1}
          far={5}
          resolution={256}
          color={dayTime ? "#000000" : "#001122"}
        />

        {/* Ambient particles */}
        {dayTime && <ParticleField />}

        {/* Render all users in their seats */}
        {users.map(
          (user) =>
            user && user.seatIndex !== undefined &&
            seatPositions[user.seatIndex] && 
            user.seatIndex !== mySeatIndex && ( // Don't render the current user in third-person
              <group key={user.id || `user-${user.seatIndex}`}>
                <UserCharacter
                  user={user}
                  position={seatPositions[user.seatIndex].position}
                  rotation={seatPositions[user.seatIndex].rotation}
                />
                <NameTag
                  position={seatPositions[user.seatIndex].position}
                  name={user.name || `User ${user.seatIndex + 1}`}
                />
              </group>
            )
        )}
        
        {/* Render the current user only in third-person view */}
        {!firstPersonView && mySeatIndex >= 0 && seatPositions[mySeatIndex] && (
          <group>
            {/* Use the selected character model */}
            <UserCharacter
              user={{ id: "self", character: myCharacter }}
              position={seatPositions[mySeatIndex].position}
              rotation={seatPositions[mySeatIndex].rotation}
            />
            <NameTag
              position={seatPositions[mySeatIndex].position}
              name="You"
            />
          </group>
        )}
      </Suspense>
    </>
  );
};