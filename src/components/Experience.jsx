import { OrbitControls, ScrollControls } from "@react-three/drei";

import { Skyscraper } from "./Skyscraper";

function Experience() {
  return (
    <>
      {/* <ambientLight intensity={5} /> */}
      <OrbitControls enableZoom={false} />
      <ScrollControls pages={2} damping={0.25}>
        <Skyscraper />
      </ScrollControls>
    </>
  );
}

export default Experience;
