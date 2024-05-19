import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Environment } from "@react-three/drei";
import { Stats } from "@react-three/drei";
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
      <Canvas>
        <Cameras />
        <Environment preset="city" />
        <color attach="background" args={["#242424"]} />
        <Suspense>
          <Physics debug={debug}>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
      {debug && <Stats />}
    </>
  );
};

export default App;
