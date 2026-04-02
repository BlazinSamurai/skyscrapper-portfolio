import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useRef } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import { Skyscraper } from "./Skyscraper";

function Experience() {
  // This grabs the <Canvas> camera
  const { camera } = useThree();
  const scroll = useScroll();
  const timeline = useRef();

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
      <Skyscraper />
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
