import { create } from "zustand";

export const useGameStore = create((set, get) => ({
  gameState: 1,
  gamePlayers: 0,
  score: { player1: 0, player2: 0, player3: 0, player4: 0 },
  withinScoreZone: [],
  resetGame: () => {
    console.log("Resets the game");
    get().score.map((player) => (player = 0));
  },
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
  isDragging: false,
  draggedCapsule: null,
  setIsDragging: (dragging) => set({ isDragging: dragging }),
  setDraggedCapsule: (dc) => set({ draggedCapsule: dc }),
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
  removeCapsule: () => set({ capsules: [] }),
}));
