import React from "react";
import { useGameStore } from "../store/store";
import "../App.css";

const MainUI = () => {
  const addCapsule = useGameStore((state) => state.addCapsule);
  const removeCapsule = useGameStore((state) => state.removeCapsule);

  return (
    <div
      id="mainUI"
      className="absolute left-0 top-0 z-50 w-full h-full mx-auto flex flex-col items-center"
      style={{ pointerEvents: "none" }}
    >
      <div className="flex justify-center m-1" style={{ pointerEvents: "all" }}>
        <button
          className="m-1 focus:outline-black w-48 text-white text-sm py-2.5 px-4 border-b-4 border-blue-800 bg-blue-800 hover:bg-blue-400"
          onClick={() => addCapsule()}
        >
          Add capsule
        </button>

        <button
          className="m-1 focus:outline-black w-48 text-white text-sm py-2.5 px-4 border-b-4 border-blue-800 bg-blue-800 hover:bg-blue-400"
          onClick={() => removeCapsule()}
        >
          Remove all capsules
        </button>
      </div>
    </div>
  );
};

export default MainUI;
