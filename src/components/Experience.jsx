import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import { Skyscraper } from "./Skyscraper";

function Experience() {
  const desktopFOV = 15;
  const tabletFOV = 19;
  const mobileFOV = 30;

  // prettier-ignore
  const tabletWidth = { max: 768, min: 426 };
  const mobileWidth = { max: 425, min: 320 };

  const [position, setPostion] = useState({
    one: { x: 0, y: 0, z: 0 },
    two: { x: 0, y: 0, z: 0 },
    three: { x: 0, y: 0, z: 0 },
  });

  // prettier-ignore
  const desktopPositions = {
    One: {   x: -50, y: 10, z: 15},
    Two: {   x: 30,  y: 15, z: 15},
    Three: { x: 30,  y: 20, z: -20}
  };
  const tabletPositions = {
    One: { x: -50, y: 10, z: 18 },
    Two: { x: 30, y: 15, z: 18 },
    Three: { x: 35, y: 20, z: -15 },
  };
  const mobilePositions = {
    One: { x: -28, y: 10, z: 2 },
    Two: { x: 25, y: 15, z: 5 },
    Three: { x: 25, y: 22, z: -4 },
  };

  // This grabs the <Canvas> camera
  const { camera } = useThree();
  const scroll = useScroll();
  const timeline = useRef();

  // prettier - ignore
  useEffect(() => {
    if (window.screen.width > tabletWidth.max) {
      // console.log(`Desktop = ${window.screen.width} > ${tabletWidth.max}`);
      camera.fov = desktopFOV;
      camera.updateProjectionMatrix();
      // prettier-ignore
      setPostion({
        one: {   x: desktopPositions.One.x,   y: desktopPositions.One.y,   z: desktopPositions.One.z},
        two: {   x: desktopPositions.Two.x,   y: desktopPositions.Two.y,   z: desktopPositions.Two.z},
        three: { x: desktopPositions.Three.x, y: desktopPositions.Three.y, z: desktopPositions.Three.z},
      });
    } else {
      if (window.screen.width >= tabletWidth.min) {
        // console.log(`Tablet = ${window.screen.width} >= ${tabletWidth.min}`);
        camera.fov = tabletFOV;
        camera.updateProjectionMatrix();
        // prettier-ignore
        setPostion({
            one: { x: tabletPositions.One.x, y: tabletPositions.One.y, z: tabletPositions.One.z },
            two: { x: tabletPositions.Two.x, y: tabletPositions.Two.y, z: tabletPositions.Two.z },
            three: { x: tabletPositions.Three.x, y: tabletPositions.Three.y, z: tabletPositions.Three.z }
          });
      }
      if (mobileWidth.max >= window.screen.width) {
        // console.log(`Mobile = ${mobileWidth.max} >= ${window.screen.width}`);
        camera.fov = mobileFOV;
        camera.updateProjectionMatrix();
        // prettier-ignore
        setPostion({
            one: { x: mobilePositions.One.x, y: mobilePositions.One.y, z: mobilePositions.One.z },
            two: { x: mobilePositions.Two.x, y: mobilePositions.Two.y, z: mobilePositions.Two.z },
            three: { x: mobilePositions.Three.x, y: mobilePositions.Three.y, z: mobilePositions.Three.z }
          });
      }
    }
  }, [window.screen.width]);

  // 1. Create a "Master Timeline" that is PAUSED
  useGSAP(
    () => {
      timeline.current = gsap.timeline({ paused: true });

      if (!position) return;

      // STREET VIEW to FISH TANK
      timeline.current.to(camera.position, {
        x: position.one.x,
        y: position.one.y,
        z: position.one.z,
        duration: 3,
      });

      // FISH TANK to PROJECT 1
      timeline.current.to(camera.position, {
        x: position.two.x,
        y: position.two.y,
        z: position.two.z,
        duration: 3,
      });

      // PROJECT 1 to PROJECT 2
      timeline.current.to(camera.position, {
        x: position.three.x,
        y: position.three.y,
        z: position.three.z,
        duration: 3,
      });
    },
    { camera, dependencies: [position] },
  );

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
      <color args={["#000"]} attach="background" />
      <fog attach="fog" args={["#413d3d", 2, 85]} />
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
