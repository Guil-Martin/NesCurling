import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Map } from "./components/map";
import { SoftShadows } from "@react-three/drei";
import "./App.css"

const App = () => {
  return (
    <Canvas shadows camera={{ position: [0,30,0], fov: 30 }}>
      <color attach="background" args={["#242424"]} />
      <Map />
      <SoftShadows size={42} />
      <Experience />
    </Canvas>
  );
}

export default App;
