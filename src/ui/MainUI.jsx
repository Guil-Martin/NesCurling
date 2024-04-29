import React from "react";
import { useGameStore } from "../store/store";

const MainUI = () => {
  const addCapsule = useGameStore((state) => state.addCapsule);
  const removeCapsule = useGameStore((state) => state.removeCapsule);

  return (
    <>
      <button
        onClick={() => addCapsule()}
        style={{
          position: "absolute",
          zIndex: "1000",
          background: "#6fc5ed",
          left: "20px",
          top: "60px",
        }}
      >
        Add capsule
      </button>

      <button
        onClick={() => removeCapsule()}
        style={{
          position: "absolute",
          zIndex: "1000",
          background: "red",
          left: "20px",
          top: "80px",
        }}
      >
        Remove all capsules
      </button>
    </>
  );
};

export default MainUI;
