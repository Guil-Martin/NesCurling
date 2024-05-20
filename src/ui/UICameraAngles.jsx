import React from "react";
import { useGameStore } from "../store/store";
import { cameraAngleImgs } from "../utils/gameData";

const UICameraAngles = () => {
  const setCameraAngle = useGameStore((state) => state.setCameraAngle);

  return (
    <div
      id="ui-camera-angles"
      className="absolute flex flex-col right-0 top-80 rounded-xl"
      style={{ pointerEvents: "all" }}
    >
      {cameraAngleImgs.map((img, idx) => {
        return (
          <button
            key={idx}
            type="button"
            className="border mt-1 bg-slate-700 hover:bg-blue-500 rounded-lg p-2 text-center inline-flex items-center dark:border-blue-300 dark:hover:bg-blue-300"
            onClick={() => setCameraAngle(idx)}
          >
            <img src={img} className="w-10 h-10" />
          </button>
        );
      })}
    </div>
  );
};

export default UICameraAngles;
