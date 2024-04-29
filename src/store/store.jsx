import { create } from "zustand";

export const useGameStore = create((set, get) => ({
  capsules: [
    {
      key: "capsule_" + Math.random(),
      position: [0.1, 1.2 + Math.random(), 0],
      color: "yellow",
    },
    {
      key: "capsule_" + Math.random(),
      position: [0.1, 1.5, 0],
      color: "blue",
    },
    {
      key: "capsule_" + Math.random(),
      position: [0.1, 2.0, 0],
      color: "red",
    },
  ],

  addCapsule: () =>
    set({
      capsules: [
        ...get().capsules,
        {
          key: "capsule_" + Math.random(),
          position: [0.1 + Math.random(), 1.8 + Math.random(), -1.2],
          color: "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16),
        },
      ],
    }),
  removeCapsule: () => set({ capsules: [] }),
}));
