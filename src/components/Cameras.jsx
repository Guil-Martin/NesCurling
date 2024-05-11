import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../store/store.jsx";
import { useEffect } from "react";

const Cameras = () => {
  const gameState = useGameStore((state) => state.gameState);
  const isDragging = useGameStore((state) => state.isDragging);
  const setMainCameraRef = useGameStore((state) => state.setMainCameraRef);
  const setOrbitControlsRef = useGameStore(
    (state) => state.setOrbitControlsRef
  );
  const mainCamera = useGameStore((state) => state.mainCamera);
  const setCameraAngle = useGameStore((state) => state.setCameraAngle);
  const capsuleRefs = useGameStore((state) => state.capsuleRefs);

  useFrame((state) => {
    if (!!mainCamera) {
      if (gameState === 1 && capsuleRefs[0]) {
        // TODO lock camera on capsule, ability to move the capsule on the zone and move camera with right click
      } else if (gameState === 2 && capsuleRefs[0]) {
        // capsuleFollowView(state);
      }
    }
  });

  useEffect(() => {
    if (!!mainCamera && capsuleRefs[0]) {
      switch (gameState) {
        case 1:
          setCameraAngle(1);
          break;
        case 2:
          setCameraAngle(2);
          break;
        default:
          break;
      }
    }
  }, [capsuleRefs, gameState]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 6, -6]}
        fov={60}
        ref={setMainCameraRef}
      />
      <OrbitControls
        enabled={!isDragging && gameState !== 1}
        ref={setOrbitControlsRef}
      />
      {/* <CameraPositionHelper event={"mousedown"} /> */}
    </>
  );
};

export default Cameras;
