import React from "react";
import { useGameStore } from "../store/store";
import { playerColors, capsuleImgs } from "../utils/gameData";

const UIInfos = () => {
  const setDebug = useGameStore((state) => state.setDebug);

  const gameState = useGameStore((state) => state.gameState);
  const turn = useGameStore((state) => state.turn);
  const round = useGameStore((state) => state.round);
  const nbCapsules = useGameStore((state) => state.nbCapsules);
  const scoreToWin = useGameStore((state) => state.scoreToWin);

  const addCapsule = useGameStore((state) => state.addCapsule);
  const removeCapsule = useGameStore((state) => state.removeCapsule);

  const withinScoreZone = useGameStore((state) => state.withinScoreZone);
  const players = useGameStore((state) => state.players);

  const returnImgs = (player, idx) => {
    const imgs = [];
    for (let index = 0; index < player.remaining; index++) {
      imgs.push(<img key={index} src={capsuleImgs[idx]} className="w-6" />);
    }
    return imgs;
  };

  return (
    <div
      id="opt-infos"
      className="absolute w-64 right-1 top-1 p-2 bg-slate-500 text-white"
    >

      <div className="flex justify-center" style={{ pointerEvents: "all" }}>
        <button
          className="m-1 focus:outline-black w-24  text-white text-sm py-2.5 px-4 border-b-4 border-blue-800 bg-blue-800 hover:bg-blue-400"
          onClick={() => setDebug()}
        >
          Debug
        </button>
      </div>

      {gameState === 0 && (
        <div
          className="flex justify-center m-1"
          style={{ pointerEvents: "all" }}
        >
          <button
            className="m-1 focus:outline-black w-48 text-white text-sm py-2.5 px-4 border-b-4 border-blue-800 bg-blue-800 hover:bg-blue-400"
            onClick={() => addCapsule()}
          >
            Ajouter capsule
          </button>

          <button
            className="m-1 focus:outline-black w-48 text-white text-sm py-2.5 px-4 border-b-4 border-blue-800 bg-blue-800 hover:bg-blue-400"
            onClick={() => removeCapsule()}
          >
            Supprimer capsules
          </button>
        </div>
      )}

      <div>
        Game state : <span className="font-bold">{gameState}</span>
      </div>
      <div>
        Nombre de capsules : <span className="font-bold">{nbCapsules}</span>
      </div>
      <div>
        Score à atteindre : <span className="font-bold">{scoreToWin}</span>
      </div>
      <div>
        Tour : <span className="font-bold">{turn}</span>
      </div>
      <div>
        Manche : <span className="font-bold">{round}</span>
      </div>

      <div className="bg-slate-700 mt-2 p-2">
        <div>Joueurs :</div>

        {players.map((player, idx) => {
          return (
            <div
              key={idx}
              className="bg bg"
              style={{ color: playerColors[idx] }}
            >
              <div>
                P{player.slot} - {player.name}
              </div>
              <div className="flex">{returnImgs(player, idx)}</div>
              {/* <img src={capsuleImgs[idx]} className="w-6" /> */}
              {/* <div className="w-6">{player.remaining} X</div> */}
            </div>
          );
        })}
      </div>
      <div className="bg-slate-700 mt-2 p-2">
        <div>Zone de score:</div>
        <ul>
          {withinScoreZone.map((capsule) => (
            <div
              key={capsule.userData.key}
              className="flex"
              style={{ color: playerColors[capsule.userData.owner.slot - 1] }}
            >
              <div>
                <img
                  src={capsuleImgs[capsule.userData.owner.slot - 1]}
                  className="w-6"
                />
              </div>
              <div>{"- " + capsule.userData.key}</div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UIInfos;
