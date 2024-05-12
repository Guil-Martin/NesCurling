import React from "react";
import { useGameStore } from "../store/store";
import { playerColors } from "../utils/gameData";

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${day}/${month} - ${hours}h${minutes}`;
};

const UIGameHistory = () => {
  const gameHistory = useGameStore((state) => state.gameHistory);
  const removeGameHistory = useGameStore((state) => state.removeGameHistory);

  return (
    <div
      id="ui-game-history"
      className="absolute rounded-xl bottom-2 left-1 overflow-scroll p-2 w-80 max-w-80 max-h-72 bg-slate-500"
      style={{ pointerEvents: "all" }}
    >
      {gameHistory.map((gameData) => {
        return (
          <div
            key={gameData.id}
            className="flex flex-col relative bg-slate-700 text-white rounded-xl p-1 mt-2"
          >
            <button
              className="absolute text-xl top-1 right-1 rounded-r-xl px-2 bg-slate-400 text-red-800"
              onClick={() => removeGameHistory(gameData.id)}
            >
              X
            </button>

            <div className="text-center border-2 rounded-xl">
              {formatTimestamp(gameData.id)}
            </div>

            <div
              id="history-players"
              className="flex items-center overflow-x-auto"
            >
              {gameData.players.map((player, idx) => (
                <>
                  {idx !== 0 ? (
                    <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                      VS
                    </span>
                  ) : null}
                  <div style={{ color: playerColors[idx] }} className="m-1">
                    {player}
                  </div>
                </>
              ))}
            </div>

            <div id="history-score" className="flex items-center">
              {gameData.score.map((amount, idx) => (
                <>
                  {idx !== 0 ? (
                    <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-white">
                      -
                    </span>
                  ) : null}
                  <div className="m-1" style={{ color: playerColors[idx] }}>
                    {amount}
                  </div>
                </>
              ))}
            </div>

            <div
              id="history-winner"
              className="flex h-full m-1 overflow-x-auto"
            >
              <div>Gagnant </div>
              <div
                className="ml-2"
                style={{ color: playerColors[gameData.winner - 1] }}
              >
                {gameData.players[gameData.winner - 1]}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UIGameHistory;
