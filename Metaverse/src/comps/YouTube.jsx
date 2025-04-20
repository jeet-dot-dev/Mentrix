import React, { useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export const YouTube = ({ videoId = "yr3-_to2BKA", position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }) => {
  const meshRef = useRef();
  
  // Subtle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Video frame with border */}
      <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[16.4, 9.4, 0.1]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Video screen */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <planeGeometry args={[16, 9]} />
        <meshStandardMaterial color="#000000" emissive="#222222" emissiveIntensity={0.2} />
      </mesh>
      
      {/* YouTube iframe */}
      <Html
        transform
        position={[0, 0, 0.02]}
        scale={0.0625}
        occlude
        style={{
          width: '1600px',
          height: '900px',
          pointerEvents: 'auto',
          border: 'none',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)'
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