import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useGameStore } from "../store/store.jsx";

const Cameras = () => {
  const isDragging = useGameStore((state) => state.isDragging);
  const setMainCameraRef = useGameStore((state) => state.setMainCameraRef);
  const setOrbitControlsRef = useGameStore(
    (state) => state.setOrbitControlsRef
  );

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 6, -6]}
        fov={60}
        ref={setMainCameraRef}
      />
      <OrbitControls
        // enabled={!isDragging && gameState !== 1}
        enabled={!isDragging}
        ref={setOrbitControlsRef}
      />
      {/* <CameraPositionHelper event={"mousedown"} /> */}
    </>
  );
};

export default Cameras;
