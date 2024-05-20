import React from "react";
import { Line } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Vector2, Raycaster } from "three";
import { useGameStore } from "../store/store";
import { Color, Vector3 } from "three/src/Three.js";

const DragLine = ({ draggingPlane }) => {
  const isDragging = useGameStore((state) => state.isDragging);
  const capsuleRefs = useGameStore((state) => state.capsuleRefs);

  const [lineStart, setLineStart] = useState(null);
  const [lineEnd, setLineEnd] = useState(null);

  const handlePointerMove = (event) => {
    if (!isDragging || !draggingPlane) return;

    const capPos = capsuleRefs[0].translation();
    const capPostV = new Vector3(capPos.x, capPos.y + 0.035, capPos.z);
    setLineStart(capPostV);

    const raycaster = new Raycaster();
    const mouse = new Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, useGameStore.getState().mainCamera);
    const intersects = raycaster.intersectObject(draggingPlane.current);

    if (intersects.length > 0) {
      const point = intersects[0].point;
      setLineEnd(new Vector3(point.x, point.y + 0.035, point.z));
    }
  };

  useEffect(() => {
    if (!isDragging) {
      setLineEnd(null);
      return;
    }
    window.addEventListener("mousemove", handlePointerMove);
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      document.body.style.cursor = 'default';
    };
  }, [isDragging]);

  const calculateLineColor = () => {
    if (!lineStart || !lineEnd) return "blue";

    const distance = lineStart.distanceTo(lineEnd);
    const maxDistance = 0.8;

    let color = new Color(0x0000ff);

    if (distance <= maxDistance / 2) {
      color.lerp(new Color(0xffff00), distance / (maxDistance / 2)); // Interpolate to Yellow
    } else {
      color = new Color(0xffff00);
      color.lerp(
        new Color(0xff0000),
        (distance - maxDistance / 2) / (maxDistance / 2)
      ); // Interpolate to Red
    }

    return `#${color.getHexString()}`;
  };

  return (
    <>
      {lineStart && lineEnd && isDragging && (
        <Line
          points={[
            [lineStart.x, lineStart.y, lineStart.z],
            [lineEnd.x, lineEnd.y, lineEnd.z],
          ]}
          color={calculateLineColor()}
          lineWidth={3}
          dashed
          dashSize={0.05}
          gapSize={0.02}
        />
      )}
    </>
  );
};

export default DragLine;
