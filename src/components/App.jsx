import "./App.css";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

import Experience from "./Experience";

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
      }}
    >
      <ScrollControls pages={1} damping={0.1}>
        <Experience />
      </ScrollControls>
    </Canvas>
  );
}

export default App;
