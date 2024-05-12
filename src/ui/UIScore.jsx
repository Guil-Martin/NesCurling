import React from "react";
import { useGameStore } from "../store/store";
import { playerColors } from "../utils/gameData";

const UIScore = () => {
  const score = useGameStore((state) => state.score);

  return (
    <div id="ui-score" className="absolute w-64 right-1 top-1 p-2 flex justify-center items-center rounded-xl text-4xl bg-slate-500 text-white">
      {score.map((ps, idx) => {
        return (
          <div key={idx} className="flex items-center">
            {idx !== 0 ? <span className="">-</span> : null}
            <div
              className="p-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
              style={{ color: playerColors[idx] }}
            >
              {ps}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UIScore;
