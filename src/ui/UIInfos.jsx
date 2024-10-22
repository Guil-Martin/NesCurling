import React from "react";
import { useGameStore } from "../store/store";
import { playerColors, capsuleImgs } from "../utils/gameData";

const UIInfos = () => {
  const round = useGameStore((state) => state.round);
  const players = useGameStore((state) => state.players);
  const score = useGameStore((state) => state.score);

  const returnImgs = (player, idx) => {
    const imgs = [];
    for (let index = 0; index < player.remaining; index++) {
      imgs.push(
        <img
          key={index}
          src={capsuleImgs[idx]}
          className="my-1"
          style={{ width: "1.4rem" }}
        />
      );
    }
    return imgs;
  };

  return (
    <div
      id="ui-infos"
      className="absolute w-auto min-w-72 rounded-b-md right-50 top-0 bg-slate-500 text-white"
    >
      <div className="flex flex-wrap items-center justify-between">
        <div className="text-lg bg-slate-700 px-1 rounded-r-md">
          Manche <span className="font-bold">{round}</span>
        </div>

        <div className="flex ml-2">
          {players.map((player, idx) => (
            <div
              className="bg-slate-700 mx-1 px-1 rounded-md border-1 border-black"
              key={idx}
              style={{ color: playerColors[idx] }}
            >
              {player.name}
            </div>
          ))}
        </div>

        <div className="flex text-lg bg-slate-700 ml-2 px-1 rounded-l-md">
          {score.map((ps, idx) => {
            return (
              <div key={idx} className="flex items-center">
                {idx !== 0 ? <span className="px-1">-</span> : null}
                <div
                  className="drop-shadow-[0_2px_2px_rgba(0,0,0,1)]"
                  style={{ color: playerColors[idx] }}
                >
                  {ps}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-700 rounded-b-md p-1 flex flex-wrap">
        {players.map((player, idx) => {
          return (
            <div key={idx} style={{ color: playerColors[idx] }}>
              <div className="flex flex-wrap">{returnImgs(player, idx)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UIInfos;
