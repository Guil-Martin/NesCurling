import React from "react";
import { useGameStore } from "../store/store";
import "../App.css";

const UIInfos = () => {
  const setDebug = useGameStore((state) => state.setDebug);

  const gameState = useGameStore((state) => state.gameState);
  const turn = useGameStore((state) => state.turn);
  const nbPlayers = useGameStore((state) => state.nbPlayers);
  const nbCapsules = useGameStore((state) => state.nbCapsules);

  const addCapsule = useGameStore((state) => state.addCapsule);
  const removeCapsule = useGameStore((state) => state.removeCapsule);

  const withinScoreZone = useGameStore((state) => state.withinScoreZone);
  const players = useGameStore((state) => state.players);

  return (
    <div
      id="opt-infos"
      className="absolute w-64 right-1 top-1 p-2 bg-slate-500 text-white"
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

      <div className="flex justify-center" style={{ pointerEvents: "all" }}>
        <button
          className="m-1 focus:outline-black w-24  text-white text-sm py-2.5 px-4 border-b-4 border-blue-800 bg-blue-800 hover:bg-blue-400"
          onClick={() => setDebug()}
        >
          Debug
        </button>
      </div>
      <div>Game state: {gameState}</div>
      <div>Nombre de joueurs: {nbPlayers}</div>
      <div>Nombre de capsules: {nbCapsules}</div>
      <div>Tour: {turn}</div>
      <div className="bg-slate-700 mt-2 p-2">
        <div>List players:</div>
        {players[0] && (
          <div>
            P1: - {players[0].slot} / {players[0].name}{" "}
          </div>
        )}
        {players[1] && (
          <div>
            P2: - {players[1].slot} / {players[1].name}{" "}
          </div>
        )}
        {players[2] && (
          <div>
            P3: - {players[2].slot} / {players[2].name}{" "}
          </div>
        )}
        {players[3] && (
          <div>
            P4: - {players[3].slot} / {players[3].name}{" "}
          </div>
        )}
      </div>
      <div className="bg-slate-700 mt-2 p-2">
        <div>List capsule in score zone:</div>
        <ul>
          {withinScoreZone.map((capsule) => {
            return <li>{"- " + capsule.userData.key}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default UIInfos;
