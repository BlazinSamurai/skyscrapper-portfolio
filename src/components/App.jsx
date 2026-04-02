import "./App.css";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

import Experience from "./Experience";

// function CameraManager() {
//   const { camera } = useThree();

//   // Create Leva controls
//   const { cameraPosition } = useControls("Camera", {
//     cameraPosition: {
//       value: [2, 0.2, 0],
//       step: 0.1,
//       onChange: (v) => {
//         camera.position.set(v[0], v[1], v[2]);
//       },
//     },
//     fov: 75,
//   });

//   return null; // Component only acts as a manager
// }

function App() {
  const { cameraRef } = useRef();

  return (
    // For the camera to be "animatable," it needs to
    // have an initial position defined, and ScrollControls
    // must wrap your Experience component.
    <Canvas
      camera={{
        fov: 15,
        position: [5, 2, 15],
        // position: [0, 0, 0], NO
      }}
    >
      {/* <CameraManager /> */}
      <ScrollControls pages={1} damping={0.1}>
        <Experience />
      </ScrollControls>
    </Canvas>
  );
}

export default App;
