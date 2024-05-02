import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SoftShadows } from "@react-three/drei";
import "./App.css";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import MainUI from "./ui/MainUI";
import CameraPositionHelper from "./helpers/CameraPositionHelper";

const App = () => {
  return (
    <>
      <MainUI />
      <Canvas
        // shadows
        camera={{
          position: [0.56, 3.29, -0.74],
          // position: [1.80, 3.96, -2.25],
          fov: 70,
        }}
      >
        {/* <PerspectiveCamera makeDefault position={[1.80, 3.96, -2.25]} /> */}
        <CameraPositionHelper event={"mousedown"} />

        <color attach="background" args={["#242424"]} />
        <SoftShadows size={5} />

        {/* <Environment preset="sunset" /> */}

        <directionalLight
          // ref={dirLightRef}
          // position={lightPos}
          position={[25, 18, -25]}
          intensity={0.8}
          // castShadow
          // shadow-camera-near={0}
          // shadow-camera-far={80}
          // shadow-camera-left={-30}
          // shadow-camera-right={30}
          // shadow-camera-top={25}
          // shadow-camera-bottom={-25}
          // shadow-mapSize-width={4096}
          // shadow-mapSize-height={4096}
          // shadow-bias={-0.0001}
        />

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
