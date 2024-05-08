import React from "react";
import { useGameStore } from "../store/store";
import UIInfos from "./UIInfos";
import { playerColors } from "../utils/gameData";
import UIScore from "./UIScore";
import UIWinner from "./UIWinner";

const MainUI = () => {
  const gameState = useGameStore((state) => state.gameState);
  const nbCapsules = useGameStore((state) => state.nbCapsules);
  const scoreToWin = useGameStore((state) => state.scoreToWin);
  const setScoreToWin = useGameStore((state) => state.setScoreToWin);
  const players = useGameStore((state) => state.players);
  const onPlayerChange = useGameStore((state) => state.onPlayerChange);
  const addPlayer = useGameStore((state) => state.addPlayer);
  const removePlayer = useGameStore((state) => state.removePlayer);
  const setNbCapsules = useGameStore((state) => state.setNbCapsules);
  const startGame = useGameStore((state) => state.startGame);

  return (
    <div
      id="mainUI"
      className="absolute left-0 top-0 z-50 w-full h-full mx-auto flex flex-col items-center"
      style={{ pointerEvents: "none" }}
    >
      <UIInfos />
      <UIScore />

      {gameState === 5 && <UIWinner />}

      {gameState === 0 && (
        <div
          id="opt-wrapper"
          className="absolute left-2 top-14 bg-teal-700 p-4 rounded-md flex flex-col items-center justify-center"
          style={{ pointerEvents: "all", userSelect: "none" }}
        >
          <div id="opt-nbplayers" className="w-full text-white font-bold">
            <label className="flex flex-grow border-t border-gray-400">
              Joueurs
            </label>

            <div className="flex justify-center">
              <button className="w-8" onClick={() => addPlayer()}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Edit / Add_Plus_Circle">
                    <path
                      id="Vector"
                      d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                      stroke="#adc3ff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </button>
            </div>

            {players.map((player) => (
              <div className="flex py-1" key={player.slot}>
                <div className="flex justify-center w-8">
                  <svg
                    fill={playerColors[player.slot - 1]}
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.413 0.643c1.937 0.252 3.448 2.359 3.448 4.902 0 1.408-0.482 2.666-1.226 3.562 4.027 0.758 4.332 7.547 4.332 12.312h-2.793l-0.741 9.947h-7.096l-0.655-9.947h-2.65c0-4.779-0.096-11.687 4.303-12.369-0.711-0.892-1.168-2.132-1.168-3.505 0-2.713 1.727-4.902 3.847-4.902 0.132 0 0.27-0.020 0.399 0v0z"></path>
                  </svg>
                </div>

                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => onPlayerChange(player.slot, e.target.value)}
                  id="input-6"
                  className="block w-full h-10 pl-8 pr-3 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-slate-500"
                  placeholder="Nom du joueur"
                />

                <button
                  className="flex justify-center w-8 bg-slate-400"
                  onClick={() => removePlayer(player.slot)}
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="#e56262"
                    className="icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z"
                      fill=""
                    />
                    <path
                      d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z"
                      fill=""
                    />
                    <path d="M328 340.8l32-31.2 348 348-32 32z" fill="" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div id="opt-nbcapsules" className="mt-2 w-full text-white font-bold">
            <label className="flex flex-grow border-t border-gray-400">
              Nombre de capsules
            </label>
            <div className="flex justify-between w-full">
              <div>{nbCapsules}</div>
              <div>10</div>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={nbCapsules}
              className="h-2 w-full cursor-ew-resize appearance-none rounded-full bg-gray-200 disabled:cursor-not-allowed"
              onChange={(e) => setNbCapsules(e.target.value)}
              // Math.round(e.target.value / 10)
            />
          </div>

          <div id="opt-scoreToWin" className="mt-2 w-full text-white font-bold">
            <label className="flex flex-grow border-t border-gray-400">
              Score à atteindre :
            </label>
            <div className="flex justify-between w-full">
              <div>{scoreToWin}</div>
              <div>20</div>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={scoreToWin}
              className="h-2 w-full cursor-ew-resize appearance-none rounded-full bg-gray-200 disabled:cursor-not-allowed"
              onChange={(e) => setScoreToWin(e.target.value)}
              // Math.round(e.target.value / 10)
            />
          </div>

          <button
            className="inline-block mt-2 text-center px-2 py-2 text-white transition-all rounded-md shadow-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:bg-gradient-to-b dark:shadow-purple-900 shadow-purple-200 hover:shadow-2xl hover:shadow-purple-400 hover:-tranneutral-y-px"
            onClick={() => startGame()}
          >
            Démarrer
          </button>
        </div>
      )}
    </div>
  );
};

export default MainUI;
