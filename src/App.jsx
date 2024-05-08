import { Canvas, useFrame } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Environment, SoftShadows } from "@react-three/drei";
import "./App.css";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import MainUI from "./ui/MainUI";
import { useGameStore } from "./store/store.jsx";
import Cameras from "./components/Cameras.jsx";

const App = () => {
  const debug = useGameStore((state) => state.debug);

  return (
    <>
      <MainUI />
      <Canvas
      // shadows
      // camera={{
      //   position: [0.56, 3.29, -0.74],
      //   // position: [1.80, 3.96, -2.25],
      //   fov: 70,
      // }}
      >
        <Cameras />
        {/* <SoftShadows size={5} /> */}
        <Environment preset="city" />
        <color attach="background" args={["#242424"]} />
        <Suspense>
          {/* gravity={[0, -0.4, 0]} */}
          <Physics debug={debug}>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;
