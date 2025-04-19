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
import { Student1 } from "../models/Student1";
import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import * as THREE from "three";

// Interactive elements
const InteractiveElement = ({ position, name, onClick, color = "blue" }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      userData={{ interactive: true, name: name }}
    >
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial
        color={hovered ? "#ff8800" : color}
        emissive={hovered ? color : "black"}
        emissiveIntensity={hovered ? 0.5 : 0}
        transparent
        opacity={0.7}
      />
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.1}
        color={hovered ? "#ffffff" : "#cccccc"}
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </mesh>
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

// UI Indicator for interactions
const InteractionUI = ({ hoveredItem }) => {
  if (!hoveredItem) return null;

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-75 text-white px-4 py-2 rounded-lg shadow-lg">
      <div className="flex items-center space-x-2">
        <span className="text-xl">🔍</span>
        <span>Press E to interact with {hoveredItem}</span>
      </div>
    </div>
  );
};

// Main Environment Component
export default function EnvironmentComp({
  users = [],
  socket,
  mySeatIndex = -1,
  seatPositions = []
}) {
  const [cameraRotation, setCameraRotation] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState(null);
  const [dayTime, setDayTime] = useState(true); // For day/night cycle
  const controlsRef = useRef();
  const directionalLightRef = useRef();
  
  // Interactive points in the classroom
  const interactivePoints = useMemo(
    () => [
      {
        name: "Blackboard",
        position: [0, 1.5, -2.5],
        color: "#22cc88",
        action: () => {
          console.log("Interacting with blackboard");
        },
      },
      {
        name: "Teacher's Desk",
        position: [2.2, 1, -2],
        color: "#cc4488",
        action: () => {
          console.log("Interacting with teacher's desk");
        },
      },
      {
        name: "Bookshelf",
        position: [-3, 1.5, -1],
        color: "#4488cc",
        action: () => {
          console.log("Interacting with bookshelf");
        },
      },
      {
        name: "Light Switch",
        position: [3, 1.5, 0],
        color: "#cccc22",
        action: () => {
          setDayTime((prev) => !prev);
          console.log("Toggling lights");
        },
      },
    ],
    [setDayTime]
  );

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

  // Keyboard event handlers for interaction
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "e" && hoveredItem) {
        const item = interactivePoints.find(
          (point) => point.name === hoveredItem
        );
        if (item && item.action) {
          item.action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hoveredItem, interactivePoints]);

  return (
    <>
      <Canvas shadows className="w-full h-full">
        <SceneContent 
          mySeatIndex={mySeatIndex} 
          seatPositions={seatPositions} 
          dayTime={dayTime} 
          interactivePoints={interactivePoints} 
          users={users} 
          setHoveredItem={setHoveredItem}
          controlsRef={controlsRef}
          directionalLightRef={directionalLightRef}
        />
      </Canvas>

      {/* Overlay UI for interaction indicators */}
      <InteractionUI hoveredItem={hoveredItem} />

      {/* Controls help UI */}
      <div className="fixed bottom-4 left-4 bg-gray-800 bg-opacity-70 text-white px-3 py-2 rounded-md text-sm">
        <p>Mouse: Look around | Scroll: Zoom | E: Interact</p>
        {hoveredItem && <p className="mt-1">Looking at: {hoveredItem}</p>}
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
    </>
  );
}

// Scene content component to avoid render issues
const SceneContent = ({ 
  mySeatIndex, 
  seatPositions, 
  dayTime, 
  interactivePoints, 
  users, 
  setHoveredItem,
  controlsRef,
  directionalLightRef
}) => {
  // Raycaster for interactive elements
  const { raycaster, camera, scene } = useThree();
  
  // Check for interactive elements on each frame
  useFrame(() => {
    // Cast ray from camera center
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    
    // Find objects with interactive flag
    const interactiveObjects = scene.children.filter(
      (obj) => obj.userData && obj.userData.interactive
    );
    
    const intersects = raycaster.intersectObjects(interactiveObjects, true);
    
    if (intersects.length > 0) {
      // Find which interactive point was intersected
      let currentObj = intersects[0].object;
      
      // Travel up the parent chain to find the object with userData
      while (currentObj && (!currentObj.userData || !currentObj.userData.name)) {
        currentObj = currentObj.parent;
      }
      
      if (currentObj && currentObj.userData && currentObj.userData.name) {
        setHoveredItem(currentObj.userData.name);
      }
    } else {
      setHoveredItem(null);
    }
  });
  
  return (
    <>
      {mySeatIndex >= 0 && seatPositions[mySeatIndex] && (
        <PerspectiveCamera
          makeDefault
          position={seatPositions[mySeatIndex].position}
          rotation={seatPositions[mySeatIndex].rotation}
          fov={75}
        />
      )}

      <OrbitControls
        ref={controlsRef}
        enablePan={false} // Disable panning
        enableZoom={true} // Allow zooming
        maxPolarAngle={Math.PI - 0.2} // Limit looking down
        minPolarAngle={0.2} // Limit looking up
        maxDistance={5} // Limit zoom out
        minDistance={0.5} // Limit zoom in
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

        {/* Interactive elements */}
        {interactivePoints.map((point, index) => (
          <InteractiveElement
            key={index}
            position={point.position}
            name={point.name}
            color={point.color}
            onClick={() => point.action()}
          />
        ))}

        {/* Render all users in their seats */}
        {users.map(
          (user) =>
            user && user.seatIndex !== undefined &&
            seatPositions[user.seatIndex] && (
              <group key={user.id || `user-${user.seatIndex}`}>
                <Student1
                  position={seatPositions[user.seatIndex].position}
                  rotation={seatPositions[user.seatIndex].rotation}
                  userId={user.id}
                  castShadow
                />
                <NameTag
                  position={seatPositions[user.seatIndex].position}
                  name={user.name || `User ${user.seatIndex + 1}`}
                />
              </group>
            )
        )}
      </Suspense>
    </>
  );
};