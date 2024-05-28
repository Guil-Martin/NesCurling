import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useGameStore } from "../store/store.jsx";

const Cameras = () => {
  const isDragging = useGameStore((state) => state.isDragging);
  const setMainCameraRef = useGameStore((state) => state.setMainCameraRef);
  const setOrbitControlsRef = useGameStore(
    (state) => state.setOrbitControlsRef
  );
  const orbitControlsRef = useGameStore(
    (state) => state.orbitControlsRef
  );

  const minY = 2.5;
  const handleCameraChange = () => {
    const camera = orbitControlsRef.object;
    if (camera.position.y < minY) {
      camera.position.y = minY;
    }
  };

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 6, -6]}
        fov={60}
        ref={setMainCameraRef}
      />
      <OrbitControls
        onChange={handleCameraChange}
        minPolarAngle={0}
        maxPolarAngle={Math.PI * 0.36}
        enabled={!isDragging}
        ref={setOrbitControlsRef}
      />
    </>
  );
};

export default Cameras;
