import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const YouTube = ({ videoId, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }) => {
  const meshRef = useRef();
  
  // Optional: Add some animation to the plane
  useFrame((state) => {
    // Subtle floating animation
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* 3D plane to display the video */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <planeGeometry args={[16, 9]} /> {/* 16:9 aspect ratio */}
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* YouTube iframe positioned on the plane */}
      <Html
        transform
        position={[0, 0, 0.01]} // Slightly in front of the plane
        rotation={[0, 0, 0]}
        scale={[16, 9, 1]}
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&mute=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Html>
    </group>
  );
};

export default YouTube; 