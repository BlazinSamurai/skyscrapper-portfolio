import "./App.css";

import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";

import Experience from "./Experience";

function App() {
  // HELPERS
  const floorRotation = useControls("Rotation Floor", {
    x: { value: 0, min: 0, max: 10, step: 0.001 },
    y: { value: 1.56, min: 0, max: 10, step: 0.01 },
    z: { value: 0, min: 0, max: 10, step: 0.01 },
  });
  const floorPosition = useControls("Floor Position", {
    x: { value: 0.32, min: 0, max: 10, step: 0.001 },
    y: { value: 0.1, min: 0, max: 10, step: 0.01 },
    z: { value: 0, min: 0, max: 10, step: 0.01 },
  });
  const bckgndColor = useControls("Background Color", {
    color: { value: "grey" },
  });

  return (
    <Canvas
      // style={[bckgndColor.color]}
      camera={{
        fov: 20,
        position: [-10, 4, 5],
      }}
    >
      <color attach="background" args={[bckgndColor.color]} />
      <ambientLight intensity={0.5} />
      <Experience />
      <mesh
        position={[floorPosition.x, floorPosition.y, floorPosition.z]}
        rotation={[floorRotation.x, floorRotation.y, floorRotation.z]}
      >
        <boxGeometry args={[5, 0, 5]} />
        <meshStandardMaterial color="green" />
      </mesh>
      <axesHelper />
      <gridHelper />
      {/* <Leva collapsed={true} /> */}
    </Canvas>
  );
}

export default App;
