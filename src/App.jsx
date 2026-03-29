import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls, Scroll } from "@react-three/drei";

// The file generated in step 2
import { Skyscraper } from "../Skyscraper";

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas camera={{ position: [0, 2, 20], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* ScrollControls automatically handles the "scroll length" */}
        <ScrollControls pages={5} damping={0.1}>
          <Skyscraper />

          {/* This lets you place HTML text that moves with the scroll */}
          <Scroll html>
            <h1 style={{ position: "absolute", top: "20vh", left: "10vw" }}>
              Street View
            </h1>
            <h1 style={{ position: "absolute", top: "150vh", left: "10vw" }}>
              Project One
            </h1>
          </Scroll>
        </ScrollControls>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
