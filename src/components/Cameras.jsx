import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../store/store.jsx";
import CameraPositionHelper from "../helpers/CameraPositionHelper";
import { useEffect, useRef } from "react";
import { angleToRadians } from "../utils/angle.js";
import { MathUtils } from "three";

const Cameras = () => {
  const gameState = useGameStore((state) => state.gameState);
  const isDragging = useGameStore((state) => state.isDragging);

  const orbitControlsRef = useRef();

  const setMainCameraRef = useGameStore((state) => state.setMainCameraRef);
  const mainCamera = useGameStore((state) => state.mainCamera);
  const capsuleRefs = useGameStore((state) => state.capsuleRefs);

  const capsuleFollowView = (state) => {
    const { x, y, z } = capsuleRefs[0].translation();
    mainCamera.position.set(x, y + 2, z - 3);
    orbitControlsRef.current.target.set(x, y, z);

    // const { px, py } = state.pointer;
    // orbitControlsRef.current.setAzimuthalAngle(-px * angleToRadians(60));
    // orbitControlsRef.current.setPolarAngle((py + 0.5) * angleToRadians(90-45));
    // orbitControlsRef.current.update();
  };

  const placingView = () => {};

  const topView = () => {
    // TODO orthographic top view
  };

  const spectatorView = () => {
    // TODO full orbital camera ?
  };

  useFrame((state) => {
    if (!!mainCamera) {
      if (gameState === 1 && capsuleRefs[0]) {
        // const { x, y, z } = capsuleRefs[0].translation();
        // orbitControlsRef.current.target.set(x, y, z);
        // TODO lock camera on capsule, ability to move the capsule on the zone and move camera with right click
      } else if (gameState === 2 && capsuleRefs[0]) {
        capsuleFollowView(state);
        // mainCamera.position = [x, y + 1, z + 1]
        // mainCamera.lookAt([x, y, z]);
      }
    }
  });

  useEffect(() => {
    if (!!mainCamera && capsuleRefs[0]) {
      switch (gameState) {
        case 1:
          const szr = useGameStore.getState().scoreZoneRef;
          if (szr) {
            // const { cx, cy, cz } = capsuleRefs[0].translation();
            const { x, y, z } = szr.translation();
            orbitControlsRef.current.target.set(x, y, z);
            mainCamera.position.set(0, 4.5, -4.4);
            mainCamera.rotation.set(MathUtils.degToRad(33), MathUtils.degToRad(-180), 0)
          }
          break;
        case 2:
          break;
        default:
          break;
      }
    }
  }, [capsuleRefs]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        view={{ offsetX: 15 }}
        position={[0, 6, -6]}
        fov={60}
        ref={setMainCameraRef}
      />
      <OrbitControls
        enabled={!isDragging && gameState !== 1}
        ref={orbitControlsRef}
        // minPolarAngle={angleToRadians(60)}
        // maxPolarAngle={angleToRadians(80)}
        // minAzimuthAngle={angleToRadians(-45)}
        // maxAzimuthAngle={angleToRadians(45)}
      />
      {/* <CameraPositionHelper event={"mousedown"} /> */}
    </>
  );
};

export default Cameras;
