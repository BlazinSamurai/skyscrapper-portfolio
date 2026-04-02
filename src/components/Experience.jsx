import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useRef } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import { Skyscraper } from "./Skyscraper";
import { viewport } from "three/tsl";

function Experience() {
  // This grabs the <Canvas> camera
  const { camera } = useThree();
  const scroll = useScroll();
  const timeline = useRef();

  // 1. Create a "Master Timeline" that is PAUSED
  useGSAP(() => {
    timeline.current = gsap.timeline({ paused: true });

    // STREET VIEW to FISH TANK
    // Pretty good animation to get from first section to second section
    // x: -50, y: 10, z: 15
    timeline.current.to(camera.position, {
      x: -50,
      y: 10,
      z: 15,
      duration: 3, // Timeline duration is now 0 to 1
    });

    // FISH TANK to PROJECT 1
    timeline.current.to(camera.position, {
      x: 30,
      y: 15,
      z: 15,
      duration: 3, // Timeline duration is now 0 to 1
    });

    // PROJECT 1 to PROJECT 2
    timeline.current.to(camera.position, {
      x: 30,
      y: 20,
      z: -20,
      duration: 3, // Timeline duration is now 0 to 1
    });
  }, [camera]);

  // 2. Use useFrame to sync the scroll progress to the timeline
  useFrame(() => {
    // scoll.offset is a value from 0 to 1
    // We tell the GSAP timeline to seek to that specific percentage
    if (timeline.current) {
      timeline.current.seek(scroll.offset * timeline.current.duration());
      camera.lookAt(0, camera.position.y, 0);
    }
  });

  return (
    <>
      <color attach="background" args={["grey"]} />
      <ambientLight intensity={1.5} />

      {/* PROJECT 2 SECTION */}
      <group position={[0, 18, 0]}>
        <Skyscraper />
        <mesh position={[3, 3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[5, 0, 5]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </group>

      {/* PROJECT 1 SECTION */}
      <group position={[0, 12, 0]}>
        <Skyscraper />
        <mesh position={[3, 3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[5, 0, 5]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      </group>

      {/* FISH TANK SECTION */}
      <group position={[0, 6, 0]}>
        <Skyscraper />
        <mesh position={[-3, 3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[5, 0, 5]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </group>

      {/* STREET VIEW SECTION */}
      <Skyscraper />
      <mesh position={[0, 2, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[3, 0, 3]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* FLOOR */}
      <mesh position={[0.32, 0.1, 0]} rotation={[0, 1.56, 0]}>
        <boxGeometry args={[5, 0, 5]} />
        <meshStandardMaterial color="green" />
      </mesh>

      <axesHelper />
      <gridHelper />
    </>
  );
}

export default Experience;
