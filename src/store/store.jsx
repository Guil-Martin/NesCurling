import { create } from "zustand";

export const useGameStore = create((set, get) => ({
  capsules: [
    {
      key: "capsule_" + Math.random(),
      position: [-0.20, 2.8, -2.50],
      color: "yellow",
    },
    {
      key: "capsule_" + Math.random(),
      position: [0, 2.8, -2.50],
      color: "blue",
    },
    {
      key: "capsule_" + Math.random(),
      position: [0.20, 2.8, -2.50],
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
          position: [-0.5 + Math.random(), 2.8 , -2.50],
          color: "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16),
        },
      ],
    }),
  removeCapsule: () => set({ capsules: [] }),
}));
