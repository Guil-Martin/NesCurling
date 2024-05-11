import React from "react";
import { useGameStore } from "../store/store";

const UITraining = () => {
  const setDebug = useGameStore((state) => state.setDebug);
  const addCapsule = useGameStore((state) => state.addCapsule);
  const removeCapsule = useGameStore((state) => state.removeCapsule);

  return (
    <div className="absolute w-64 left-50 top-2 p-4 rounded-xl text-4xl bg-slate-500 text-white">
      <div
        className="flex flex-col justify-center items-center p-1"
        style={{ pointerEvents: "all" }}
      >
        <div className="w-full text-center pb-2 text-white font-bold text-xl">
          Entraînement
        </div>

        <button
          className="m-1 focus:outline-black rounded-xl w-48 text-white text-sm border-b-4 border-blue-800 bg-blue-800 hover:bg-blue-400"
          onClick={() => setDebug()}
        >
          Debug
        </button>

        <button
          className="m-1 focus:outline-black rounded-xl w-48 text-white text-sm px-4 border-b-4 border-blue-800 bg-blue-800 hover:bg-blue-400"
          onClick={() => addCapsule()}
        >
          Ajouter capsule
        </button>

        <button
          className="m-1 focus:outline-black rounded-xl w-48 text-white text-sm px-4 border-b-4 border-blue-800 bg-blue-800 hover:bg-blue-400"
          onClick={() => removeCapsule()}
        >
          Supprimer capsules
        </button>
      </div>
    </div>
  );
};

export default UITraining;
