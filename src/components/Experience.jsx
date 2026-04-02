import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLayoutEffect, useRef } from "react";
import { OrbitControls, ScrollControls, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import { useControls } from "leva";

import { Skyscraper } from "./Skyscraper";

export const FLOOR_HEIGHT = 0.5;
// export const FLOORS = 3;

gsap.registerPlugin(ScrollTrigger);

function Experience() {
  // This grabs the <Canvas> camera
  const { camera } = useThree();
  const scroll = useScroll();
  const timeline = useRef();

  const groupRef = useRef();
  const floorRef = useRef();

  // HELPERS
  // const floorRotation = useControls("Rotation Floor", {
  //   x: { value: 0, min: 0, max: 10, step: 0.001 },
  //   y: { value: 1.56, min: 0, max: 10, step: 0.01 },
  //   z: { value: 0, min: 0, max: 10, step: 0.01 },
  // });
  // const floorPosition = useControls("Floor Position", {
  //   x: { value: 0.32, min: 0, max: 10, step: 0.001 },
  //   y: { value: 0.1, min: 0, max: 10, step: 0.01 },
  //   z: { value: 0, min: 0, max: 10, step: 0.01 },
  // });
  // const bckgndColor = useControls("Background Color", {
  //   color: { value: "grey" },
  // });

  // 1. Create a "Master Timeline" that is PAUSED
  useGSAP(() => {
    timeline.current = gsap.timeline({ paused: true });

    timeline.current.to(camera.position, {
      y: 8,
      x: 10,
      z: 20,
      duration: 1, // Timeline duration is now 0 to 1
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
      <group ref={groupRef}>
        <Skyscraper />
        <mesh ref={floorRef} position={[0.32, 0.1, 0]} rotation={[0, 1.56, 0]}>
          <boxGeometry args={[5, 0, 5]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </group>
      <axesHelper />
      <gridHelper />
    </>
  );
}

export default Experience;
