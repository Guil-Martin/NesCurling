import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../store/store.jsx";
import CameraPositionHelper from "../helpers/CameraPositionHelper";
import { useRef } from "react";
import { angleToRadians } from "../utils/angle.js";

const Cameras = () => {
  const gameState = useGameStore((state) => state.gameState);
  const isDragging = useGameStore((state) => state.isDragging);

  const orbitControlsRef = useRef();

  const setMainCameraRef = useGameStore((state) => state.setMainCameraRef);
  const mainCamera = useGameStore((state) => state.mainCamera);
  const capsuleRefs = useGameStore((state) => state.capsuleRefs);
  const capsuleToPlace = useGameStore((state) => state.capsuleToPlace);

  useFrame((state) => {
    if (!!mainCamera) {
      if (gameState === 1 && capsuleRefs[0]) {
        const { x, y, z } = capsuleRefs[0].translation();

        mainCamera.position.set(x, y + 2.5, z - 2.5);
        orbitControlsRef.current.target.set(x, y, z);
        orbitControlsRef.current.update();

        // mainCamera.position = [x, y + 1, z + 1]
        // mainCamera.lookAt([x, y, z]);
      }
      //     const { x, y } = state.pointer;
      //     orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(60));
      //     orbitControlsRef.current.setPolarAngle((y + 0.5) * angleToRadians(90-45));
      //     orbitControlsRef.current.update();

      // clearViewOffset: function clearViewOffset()​​
      // constructor: class PerspectiveCamera { constructor(fov2, aspect2, near, far) }​​
      // copy: function copy(source, recursive)​​
      // getEffectiveFOV: function getEffectiveFOV()​​
      // getFilmHeight: function getFilmHeight()​​
      // getFilmWidth: function getFilmWidth()​​
      // getFocalLength: function getFocalLength()​​
      // setFocalLength: function setFocalLength(focalLength)​​
      // setViewOffset: function setViewOffset(fullWidth, fullHeight, x, y, width, height)​​
      // toJSON: function toJSON(meta)​​
      // updateProjectionMatrix: function updateProjectionMatrix()
    }
  });

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
        enabled={!isDragging}
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
