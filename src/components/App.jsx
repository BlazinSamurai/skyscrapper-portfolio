import "./App.css";

import { useEffect, useRef, useState } from "react";

import { Canvas, useThree } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

import Experience from "./Experience";

import { useControls } from "leva";

function App() {
  const [defaultCameraFOV, setDefaultCameraFOv] = useState(15);
  const [defaultCameraPos, setDefaultCameraPos] = useState({
    x: 5,
    y: 2,
    z: 15,
  });
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* For the camera to be "animatable," it needs to
      have an initial position defined, and 
      ScrollControls must wrap your Experience component. */}
      <Canvas
        camera={{
          fov: defaultCameraFOV,
          position: [
            defaultCameraPos.x,
            defaultCameraPos.y,
            defaultCameraPos.z,
          ],
        }}
      >
        {/* pages: Defines the length of the scroll area, each page is height:100% */}
        <ScrollControls pages={1} damping={0.1}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default App;
