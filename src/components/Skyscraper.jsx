import { useGLTF } from "@react-three/drei";

export function Skyscraper(props) {
  const { nodes, materials } = useGLTF("./models/skyscraper.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
      />
    </group>
  );
}

useGLTF.preload("./models/skyscraper.glb");
