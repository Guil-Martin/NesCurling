import { create } from "zustand";
import { playerColors } from "../utils/gameData";

export const useGameStore = create((set, get) => ({
  debug: false,
  setDebug: () => set({ debug: !get().debug }),

  mainCamera: null,
  setMainCameraRef: (camearaRef) => set({ mainCamera: camearaRef }),

  selectedLevel: "base",
  setLevel: (level) => set({ selectedLevel: level }),

  gameState: 0,
  setGameState: (newGameState) => set({ gameState: newGameState }),
  players: [
    { slot: 1, name: "Player 1", capsuleSkin: playerColors[0], remaining: 0 },
  ],
  addPlayer: (optName = "") => {
    const newPlayers = [...get().players];
    const lth = newPlayers.length;
    if (lth < 4)
      newPlayers[lth] = {
        slot: lth + 1,
        name: optName,
        capsuleSkin: playerColors[lth],
        remaining: 0,
      };
    set({ players: newPlayers });
  },
  removePlayer: (playerSlot) => {
    const newPlayers = get().players.filter(
      (player) => player.slot !== playerSlot
    );
    newPlayers.map((player, index) => (player.slot = index + 1));
    set({ players: newPlayers });
  },
  setPlayers: (players) => set({ players: players }),
  onPlayerChange: (slot, newName) => {
    const newPlayers = [...get().players];
    const playerIndex = newPlayers.findIndex((player) => player.slot === slot);
    newPlayers[playerIndex] = { ...newPlayers[playerIndex], name: newName };
    set({ players: newPlayers });
  },
  playingPlayer: null,
  setPlayingPlayer: (player) => set({ playingPlayer: player }),

  nbCapsules: 3,
  setNbCapsules: (nbCapsules) => set({ nbCapsules: nbCapsules }),

  score: [0, 0, 0, 0],
  setScore: (newScore) => set({ score: newScore }),

  scoreToWin: 10,
  setScoreToWin: (value) => set({ scoreToWin: value }),

  gameWinner: null,
  setGameWinner: (player) => set({ gameWinner: player }),

  withinScoreZone: [],
  setWithinScoreZone: (capsule) => {
    const present = get().withinScoreZone.find(
      (cap) => capsule.userData.key === cap.userData.key
    );
    // have to check if already present since the onEnterScoreZone happens twice
    if (!present) {
      set({ withinScoreZone: [capsule, ...get().withinScoreZone] });
    }
  },
  removeWithinScoreZone: (capsuleKey) => {
    set({
      withinScoreZone: get().withinScoreZone.filter((inZoneCap) => {
        return inZoneCap.userData.key !== capsuleKey;
      }),
    });
  },
  checkWithingScoreZone: () => {
    return get().withinScoreZone.sort(
      (a, b) => b.translation().z - a.translation().z
    );
  },

  startGame: () => {
    const players = get().players;
    if (!players.length) {
      get().addPlayer("Player");
    }
    for (let i = 0; i < get().players.length; i++) {
      const player = get().players[i];
      player.name = player.name === "" ? "Player " + (i + 1) : player.name;
      player.remaining = get().nbCapsules;
    }
    get().setPlayingPlayer(players[0]);
    get().removeCapsule();
    get().setScore(get().players.map(() => 0));
    get().addCapsule();
    get().setTurn(1);
    get().setRound(1);
    get().setGameState(1);
  },

  turn: 0,
  setTurn: (newTurn) => set({ turn: newTurn }),
  endTurn: () => {
    // Check if game started
    if (get().gameState > 0) {
      const nbPlayers = get().players.length;

      const currentPlayerSlot = get().playingPlayer.slot;
      get().playingPlayer.remaining -= 1;

      const turnResult = get().checkWithingScoreZone();

      let capsulesRemain = get().players.filter(
        (player) => player.remaining !== 0
      );

      // Players spend all their capsules this round, set next round
      if (!capsulesRemain.length) {
        // Count the points for this round
        const winCap = turnResult.length && turnResult[0];
        if (winCap) {
          let nbPoints = 0;
          for (let i = 0; i < turnResult.length; i++) {
            if (
              turnResult[i].userData.owner.slot === winCap.userData.owner.slot
            )
              nbPoints++;
            else break;
          }

          // TODO determine which player to play => capsule farther to the others or not in the score zone

          get().score[winCap.userData.owner.slot - 1] =
            get().score[winCap.userData.owner.slot - 1] + nbPoints;
        }

        const winner = get().score.find((sc) => sc >= get().scoreToWin);
        if (winner !== undefined) {
          get().setGameWinner(get().players[get().score.indexOf(winner)]);
          get().setGameState(5);
        } else {
          set({ round: get().round + 1 });
          get().removeCapsule();
          get().players.forEach((player) => {
            player.remaining = get().nbCapsules;
          });
          get().setPlayingPlayer(get().players[0]);
          get().addCapsule();
          get().setGameState(1);
        }
      } else {
        get().setPlayingPlayer(
          get().players[currentPlayerSlot === nbPlayers ? 0 : currentPlayerSlot]
        );
        get().setTurn(get().turn + 1);
        get().addCapsule();
        get().setGameState(1);
      }
    }
  },

  round: 0,
  setRound: (newRound) => set({ round: newRound }),
  endRound: () => {},

  resetGame: () => {
    get().score.map((player) => (player = 0));
    get().setPlayingPlayer(get().players[0]);
    get().removeCapsule();
    get().setGameState(0);
  },

  isDragging: false,
  setIsDragging: (dragging) => set({ isDragging: dragging }),

  draggedCapsule: null,
  setDraggedCapsule: (dc) => set({ draggedCapsule: dc }),

  capsuleRefs: [],
  addCapsuleRef: (ref) => set({ capsuleRefs: [ref, ...get().capsuleRefs] }),
  capsules: [],
  addCapsule: () =>
    set({
      capsules: [
        ...get().capsules,
        {
          key: "capsule_" + Date.now(),
          owner: get().playingPlayer ? get().playingPlayer : get().players[0],
          position: [-0.5 + Math.random(), 1.8, -2.5],
          color: get().playingPlayer
            ? get().playingPlayer.capsuleSkin
            : get().players[0].capsuleSkin, // "#" + Math.floor(Math.random() * 0xffffff).toString(16),
        },
      ],
    }),
  removeCapsule: () => {
    set({ withinScoreZone: [] });
    set({ capsuleRefs: [] });
    set({ capsules: [] });
  },
}));
