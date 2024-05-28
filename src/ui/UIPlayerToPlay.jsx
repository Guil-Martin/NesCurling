import React from "react";
import { useGameStore } from "../store/store";
import { playerColors, capsuleImgs } from "../utils/gameData";

const UIPlayerToPlay = () => {
  const playingPlayer = useGameStore((state) => state.playingPlayer);
  const endRoundMsg = useGameStore((state) => state.endRoundMsg);

  return (
    <div
      id="ui-playerTurn"
      className="absolute w-128 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-3 bg-slate-800 rounded-2xl text-white"
    >
      {endRoundMsg && <div>{endRoundMsg}</div>}

      <div className="text-2xl font-extrabold">
        A{" "}
        <strong style={{ color: playerColors[playingPlayer.slot - 1] }}>
          {playingPlayer.name}
        </strong>{" "}
        de jouer !
      </div>

      <div className="mt-1text-1xl">Place ta capsule</div>
    </div>
  );
};

export default UIPlayerToPlay;
