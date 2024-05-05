import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

const CameraPositionHelper = ({ event }) => {
  const { camera } = useThree();
  const camearaRef = useRef(camera);

  // const mainCamera = useGameStore((state) => state.mainCamera);

  useEffect(() => {
    const logCameraPosition = () => {
      const { x, y, z } = camearaRef.current.position;
      const roundedX = Math.round(x * 100) / 100;
      const roundedY = Math.round(y * 100) / 100;
      const roundedZ = Math.round(z * 100) / 100;
      console.log(
        `Camera position: x, y, z => [${roundedX}, ${roundedY}, ${roundedZ}]`
      );
    };

    camearaRef.current = camera;
    window.addEventListener(event, logCameraPosition);

    return () => window.removeEventListener(event, logCameraPosition);
  }, []);

  return null;
};

export default CameraPositionHelper;
