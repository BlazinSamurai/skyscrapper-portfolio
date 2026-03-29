import React from "react";
import gsap from "gsap";

import { useGLTF, useScroll } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { useThree, useFrame } from "@react-three/fiber";

export function Skyscraper(props) {
  // 1. Load the model directly here
  const { nodes } = useGLTF("/skyscraper-transformed.glb");
  const { camera } = useThree();
  const scroll = useScroll();

  // 2. This hook runs every frame to sync scroll to camera
  useFrame(() => {
    // scroll.offset is a value from 0 (top) to 1 (bottom)
    const offset = scroll.offset;

    // Animate camera Y (height) based on scroll
    // Move from 0 to 100 height
    camera.position.y = offset * 100;

    // Add that rotation effect by shifting X and Z
    camera.position.x = 20 * Math.sin(offset * 2);
    camera.position.z = 20 * Math.cos(offset * 2);

    // Essential: Keep the camera focused on the building as it moves
    camera.lookAt(0, camera.position.y, 0);
  });

  return (
    <group {...props} dispose={null}>
      {/* Ensure the mesh name matches your Blender object name */}
      <mesh
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
      />
    </group>
  );
}

useGLTF.preload("/skyscraper-transformed.glb");
