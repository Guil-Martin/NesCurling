import React from "react";
import { useGameStore } from "../store/store";
import { playerColors, capsuleImgs } from "../utils/gameData";

const UIWinner = () => {
  const gameWinner = useGameStore((state) => state.gameWinner);
  const resetGame = useGameStore((state) => state.resetGame);

  return (
    <div
      id="ui-winner"
      className="absolute w-128 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-8 bg-slate-800 rounded-2xl text-white"
    >
      <div className="text-2xl font-extrabold">
        Gagnant : J{gameWinner.slot} -
        <span style={{ color: playerColors[gameWinner.slot - 1] }}>
          {" "}
          {gameWinner.name}
        </span>
      </div>
      <button
        className="relative w-32 inline-flex items-center justify-center mt-2 px-4 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        style={{ pointerEvents: "all" }}
        onClick={() => resetGame()}
      >
        Redémarrer
      </button>
    </div>
  );
};

export default UIWinner;
