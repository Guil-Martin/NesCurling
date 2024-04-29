import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SoftShadows } from "@react-three/drei";
import "./App.css";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import MainUI from "./ui/MainUI";

const App = () => {
  return (
    <>
      <MainUI />
      <Canvas
        shadows
        camera={{
          position: [1.80, 3.96, -2.25],
          fov: 40,
        }}
      >
        <color attach="background" args={["#242424"]} />
        <SoftShadows size={42} />
        <Suspense>
          {/* gravity={[0, -0.4, 0]} */}
          <Physics debug>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;
