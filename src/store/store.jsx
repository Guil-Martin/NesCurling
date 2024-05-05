import { create } from "zustand";

export const useGameStore = create((set, get) => ({
  debug: true,
  setDebug: () => set({ debug: !get().debug }),

  mainCamera: null,
  setMainCameraRef: (camearaRef) => set({ mainCamera: camearaRef }),

  gameState: 0,
  setGameState: (newGameState) => set({ gameState: newGameState }),

  players: [{ slot: 1, name: "Player 1" }],
  addPlayer: (optName = "") => {
    const newPlayers = [...get().players];
    const lth = newPlayers.length;
    if (lth < 4) newPlayers[lth] = { slot: lth + 1, name: optName };
    set({ players: newPlayers });
  },
  removePlayer: (playerSlot) => {
    const newPlayers = get().players.filter(
      (player) => player.slot !== playerSlot
    );
    newPlayers.map((player, index) => (player.slot = index + 1));
    set({ players: newPlayers });
  },
  onPlayerChange: (slot, newName) => {
    const newPlayers = [...get().players];
    const playerIndex = newPlayers.findIndex((player) => player.slot === slot);
    newPlayers[playerIndex] = { ...newPlayers[playerIndex], name: newName };
    set({ players: newPlayers });
  },
  playingPlayer: null,
  setPlayingPlayer: (player) => set({ playingPlayer: player }),

  nbPlayers: 1,
  setNbPlayers: (nbPlayers) => set({ nbPlayers: nbPlayers }),

  nbCapsules: 3,
  setNbCapsules: (nbCapsules) => set({ nbCapsules: nbCapsules }),

  score: { player1: 0, player2: 0, player3: 0, player4: 0 },
  setScore: (newScore) => set({ score: newScore }),

  turn: 0,
  setTurn: (newTurn) => set({ turn: newTurn }),
  endTurn: () => {
    // TODO end turn bahavior

    set({ turn: get().turn + 1 });
  },

  withinScoreZone: [],
  setWithinScoreZone: (capsule) =>
    set({ withinScoreZone: [capsule, ...get().withinScoreZone] }),
  removeWithinScoreZone: (capsule) =>
    set({
      withinScoreZone: get().withinScoreZone.filter(
        (inZoneCap) => inZoneCap.key !== capsule.key
      ),
    }),

  startGame: () => {
    console.log("Start the game");
    // TODO reset previous data, meshes etc

    const players = get().players;
    if (!players.length) {
      get().addPlayer("Player");
    }
    get().setPlayingPlayer(players[0]);

    get().removeCapsule();
    get().addCapsule();
    get().setCapsuleToPlace(get().capsuleRefs[0]);
    get().setGameState(1);
  },

  resetGame: () => {
    console.log("Resets the game");
    get().score.map((player) => (player = 0));
  },

  isDragging: false,
  setIsDragging: (dragging) => set({ isDragging: dragging }),

  draggedCapsule: null,
  setDraggedCapsule: (dc) => set({ draggedCapsule: dc }),

  capsuleRefs: [],
  addCapsuleRef: (ref) => set({ capsuleRefs: [ref, ...get().capsuleRefs] }),
  capsules: [
    {
      key: "capsule_" + Math.random(),
      position: [-0.2, 2.8, -2.5],
      color: "yellow",
    },
    {
      key: "capsule_" + Math.random(),
      position: [0, 2.8, -2.5],
      color: "blue",
    },
    {
      key: "capsule_" + Math.random(),
      position: [0.2, 2.8, -2.5],
      color: "red",
    },
  ],
  capsuleToPlace: null,
  setCapsuleToPlace: (capsule) => set({ capsuleToPlace: capsule }),
  addCapsule: () =>
    set({
      capsules: [
        ...get().capsules,
        {
          key: "capsule_" + Math.random(),
          position: [-0.5 + Math.random(), 2.8, -2.5],
          color: "#" + Math.floor(Math.random() * 0xffffff).toString(16),
        },
      ],
    }),
  removeCapsule: () => {
    set({ capsuleRefs: [] });
    set({ capsules: [] });
  },
}));
