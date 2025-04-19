import { Canvas } from "@react-three/fiber";
import { Environment, Gltf, OrbitControls } from "@react-three/drei";
import { Classroom } from "../models/Classroom";
import { Student1 } from "../models/Student1";
export default function EnvironmentComp() {
  return (
    <Canvas>
      <OrbitControls />
      {/* <Environment preset="city" color={"white"} /> */}
      <ambientLight intensity={1} color={"white"} />
      <directionalLight position={[0, 5, 0]} intensity={1} castShadow />
      <pointLight position={[0, 10, 10]} intensity={1} color={"white"} />
      <Classroom position={[0, 0, 0]} rotation={[0, Math.PI, 0]} />

      <Student1 />
    </Canvas>
  );
}
