"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Center, useGLTF } from "@react-three/drei";

function Model({ url }) {
  const gltf = useGLTF(url);
  return (
    <primitive
      object={gltf.scene}
      scale={[0.3, 0.3, 0.3]}
      rotation={[0.1, 0.5, 0.3]}
      position={[1, 1, 1]}
    />
  );
}

export default function ThreeModel() {
  return (
    <div className="absolute w-full h-full top-0 left-0 z-0">
      <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 2]} intensity={1.2} color="#000000ff" />
        <Suspense fallback={null}>
          <Center>
            <Model url="/models/quantum_cube.glb" />
          </Center>
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}
