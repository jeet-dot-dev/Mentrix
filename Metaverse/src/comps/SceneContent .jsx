// src/comps/SceneContent.jsx
import React, { Suspense, useMemo } from "react";
import {
  PerspectiveCamera,
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Vector3 } from "three";
import { Classroom } from "../models/Classroom";
import {
  NameTag,
  ParticleField,
  PlayerCharacter,
  UserCharacter,
  YouTube,
} from "./EnvironmentComp";

// Scene content component to avoid render issues
export const SceneContent = ({
  mySeatIndex,
  seatPositions,
  dayTime,
  users,
  controlsRef,
  directionalLightRef,
  firstPersonView,
  mySeatPosition,
  myCharacter,
}) => {
  // For debugging
  // console.log("My character in SceneContent:", myCharacter);
  // console.log("Users in SceneContent:", users);

  // Convert mySeatPosition array to Vector3 if it exists
  const mySeatPositionVector = useMemo(() => {
    if (mySeatPosition) {
      return new Vector3(
        mySeatPosition[0],
        mySeatPosition[1],
        mySeatPosition[2]
      );
    }
    return null;
  }, [mySeatPosition]);

  return (
    <>
      {/* In first-person view, we use PlayerCharacter with camera, otherwise use OrbitControls */}
      {firstPersonView ? (
        <PlayerCharacter
          seatPosition={mySeatPosition}
          isActive={true}
          character={myCharacter}
          // Added rotation to face forward (180 degrees)
          rotation={[0, Math.PI, 0]}
          // Adjusted camera position for better first-person view
          cameraHeight={2} // Head height
          cameraOffset={[0, 0, 0.1]} // Small offset forward to avoid seeing own model
        />
      ) : (
        <>
          {mySeatIndex >= 0 && seatPositions[mySeatIndex] && (
            <PerspectiveCamera
              makeDefault
              position={[
                seatPositions[mySeatIndex].position[0],
                seatPositions[mySeatIndex].position[1] + 2,
                seatPositions[mySeatIndex].position[2] + 2,
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

        {/* YouTube video display - positioned on the classroom blackboard */}
        {/* <axesHelper args={[5]} /> */}
        {/* YouTube video display - positioned on the classroom blackboard */}
        <YouTube
          videoId="yr3-_to2BKA"
          position={[-1, 1.5, -7.45]}
          rotation={[0, 0, 0]}
          scale={[0.5, 0.5, 0.5]}
        />

        {/* Render all users in their seats */}
        {users.map((user) => {
          if (
            user &&
            user.seatIndex !== undefined &&
            seatPositions[user.seatIndex] &&
            user.seatIndex !== mySeatIndex
          ) {
            // Calculate distance between positions manually for visibility check
            let visible = !firstPersonView;

            if (
              firstPersonView &&
              mySeatPositionVector &&
              seatPositions[user.seatIndex]
            ) {
              const userPos = seatPositions[user.seatIndex].position;
              const userVector = new Vector3(
                userPos[0],
                userPos[1],
                userPos[2]
              );
              const distance = mySeatPositionVector.distanceTo(userVector);
              visible = distance < 10;
            }

            return (
              <group key={user.id || `user-${user.seatIndex}`}>
                <UserCharacter
                  user={user}
                  position={seatPositions[user.seatIndex].position}
                  rotation={seatPositions[user.seatIndex].rotation}
                />
                <NameTag
                  // Adjusted name tag to be slightly above the character's head
                  position={[
                    seatPositions[user.seatIndex].position[0],
                    seatPositions[user.seatIndex].position[1] + 2, // Raised higher
                    seatPositions[user.seatIndex].position[2],
                  ]}
                  name={user.name || `User ${user.seatIndex + 1}`}
                  // Added scale to make name tags more readable
                  scale={0.75}
                  // Added visible prop that can be controlled
                  visible={visible}
                />
              </group>
            );
          }
          return null;
        })}

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
              position={[
                seatPositions[mySeatIndex].position[0],
                seatPositions[mySeatIndex].position[1] + 2, // Raised higher
                seatPositions[mySeatIndex].position[2],
              ]}
              name="You"
              scale={0.75}
            />
          </group>
        )}
      </Suspense>
    </>
  );
};
