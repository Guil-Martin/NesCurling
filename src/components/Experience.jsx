import { Line, Plane } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Vector2, Vector3, Raycaster } from "three";
import { NesCapsule } from "./NesCapsule";
import { NesTable } from "./NesTable";
import { useGameStore } from "../store/store";
import { Level_office } from "../levels/level_office";
import { NesCapsulePlaceholder } from "./NesCapsulePlaceholder";
import { playerColors } from "../utils/gameData";
import DragLine from "./DragLine";

export const Experience = () => {
  const gameState = useGameStore((state) => state.gameState);
  const setGameState = useGameStore((state) => state.setGameState);
  const capsulePlaceholderRef = useGameStore(
    (state) => state.capsulePlaceholderRef
  );
  const setCapsulePlaceholderRef = useGameStore(
    (state) => state.setCapsulePlaceholderRef
  );
  const capsuleRefs = useGameStore((state) => state.capsuleRefs);
  const addCapsule = useGameStore((state) => state.addCapsule);
  const addCapsuleRef = useGameStore((state) => state.addCapsuleRef);
  const capsules = useGameStore((state) => state.capsules);
  const isDragging = useGameStore((state) => state.isDragging);
  const draggedCapsule = useGameStore((state) => state.draggedCapsule);
  const setIsDragging = useGameStore((state) => state.setIsDragging);
  const setDraggedCapsule = useGameStore((state) => state.setDraggedCapsule);
  const endTurn = useGameStore((state) => state.endTurn);
  const setScoreZoneRef = useGameStore((state) => state.setScoreZoneRef);
  const setWithinScoreZone = useGameStore((state) => state.setWithinScoreZone);
  const removeWithinScoreZone = useGameStore(
    (state) => state.removeWithinScoreZone
  );
  const setPlacementPlaneRef = useGameStore(
    (state) => state.setPlacementPlaneRef
  );
  const setCameraAngle = useGameStore((state) => state.setCameraAngle);
  const draggingPlane = useRef();

  let nextTurnInterval = null;
  const onNextTurnInterval = () => {
    clearInterval(nextTurnInterval);
    endTurn();
  };

  const getRigidBodyFromRefs = (rb) => {
    return capsuleRefs.find((cap) => cap.userData.key === rb.key);
  };

  const placeCapsule = (e) => {
    if (gameState === 3) {
      addCapsule(e.point);
      setGameState(1);
      if (e.point.x > 0.6) {
        setCameraAngle(2);
      } else if (e.point.x < -0.6) {
        setCameraAngle(1);
      } else {
        setCameraAngle(0);
      }
    }
  };

  const onClickCapsule = (e, capsule) => {
    e.stopPropagation();
    if (useGameStore.getState().gameState <= 1) {
      const foundCapsule = getRigidBodyFromRefs(capsule);
      if (
        foundCapsule &&
        foundCapsule.userData.key === capsuleRefs[0].userData.key
      ) {
        setDraggedCapsule(foundCapsule);
        document.body.style.cursor = "grabbing";
        setIsDragging(true);
      }
    }
  };

  const shootAction = (e) => {
    e.stopPropagation();
    if (
      isDragging &&
      draggedCapsule &&
      draggedCapsule.userData.key === capsuleRefs[0].userData.key
    ) {
      if (
        useGameStore.getState().gameState > 0 &&
        useGameStore.getState().gameState !== 2
      ) {
        setGameState(2);
      }

      const capsulePos = draggedCapsule.translation();
      const rayTargetPos = e.point;
      const capsuleV = new Vector3(capsulePos.x, capsulePos.y, capsulePos.z);
      const rayTargetV = new Vector3(
        rayTargetPos.x,
        capsulePos.y,
        rayTargetPos.z
      );

      const direction = new Vector3();
      direction.subVectors(rayTargetV, capsuleV).normalize();

      const distance = capsuleV.distanceTo(rayTargetV);

      const impulseFactor = 0.012;
      const impulseMagnitude = Math.min(impulseFactor * distance, 0.010);

      const impulse = direction.multiplyScalar(-impulseMagnitude);

      // console.log("distance:", distance);
      // console.log("impulseMagnitude:", impulseMagnitude);
      // console.log("impulse:", impulse);
      // 0.005094961215589478

      impulse.y = 0;

      draggedCapsule.applyImpulse(impulse, true);

      if (useGameStore.getState().gameState > 0)
        nextTurnInterval = setInterval(onNextTurnInterval, 2500);
    }

    setDraggedCapsule(null);
    setIsDragging(false);
  };

  const onEnterScoreZone = (e) => {
    // console.log(">>>>> onEnterScoreZone e", e);
    if (e.other.rigidBodyObject.name.startsWith("capsule")) {
      const foundCapsule = capsuleRefs.find(
        (cap) => cap.userData.key === e.other.rigidBodyObject.name
      );
      if (foundCapsule) {
        setWithinScoreZone(foundCapsule);
      }
    }
  };

  const onExitScoreZone = (e) => {
    // console.log("<<<<< onExitScoreZone e", e);
    if (e.other.rigidBodyObject.name.startsWith("capsule")) {
      removeWithinScoreZone(e.other.rigidBodyObject.name);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!capsulePlaceholderRef) return;

      const raycaster = new Raycaster();
      const mouse = new Vector2();

      // Convert mouse position to normalized device coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, useGameStore.getState().mainCamera);
      const intersects = raycaster.intersectObject(
        useGameStore.getState().placementPlaneRef
      );

      if (intersects.length > 0) {
        const point = intersects[0].point;
        const clampedX = Math.max(-5, Math.min(5, point.x));
        const clampedZ = Math.max(-5, Math.min(5, point.z));
        capsulePlaceholderRef.position.set(clampedX, 1.9, clampedZ);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [capsulePlaceholderRef]);

  return (
    <>
      {/* <Level_base /> */}
      <RigidBody name="level" type="fixed" colliders={false}>
        <CuboidCollider args={[40, 0.2, 40]} position={[2, -0.2, 2]} />
        <Level_office />
      </RigidBody>

      <RigidBody
        name="nesTable"
        position={[0, 0, 0]}
        type="fixed"
        colliders={"hull"}
      >
        <NesTable />
      </RigidBody>

      <RigidBody
        name="scoreZone"
        position={[0, 2, 2.667]}
        type="fixed"
        ref={setScoreZoneRef}
      >
        <CuboidCollider
          args={[1.6, 0.25, 0.33]}
          sensor
          onIntersectionEnter={onEnterScoreZone}
          onIntersectionExit={onExitScoreZone}
        />
      </RigidBody>

      {gameState === 3 && (
        <NesCapsulePlaceholder
          ref={setCapsulePlaceholderRef}
          name="capsulePlaceholder"
          position={[0, 1.9, -2.5]}
          color={playerColors[useGameStore.getState().playingPlayer.slot - 1]}
        />
      )}

      <DragLine draggingPlane={draggingPlane} />

      <Plane
        name="draggingPlane"
        ref={draggingPlane}
        args={[1000, 1000]}
        position={[0, 1.8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerUp={shootAction}
      >
        <meshBasicMaterial attach="material" transparent opacity={0} />
      </Plane>

      <Plane
        name="placingPlane"
        ref={setPlacementPlaneRef}
        args={[3.01, 0.53]}
        position={[0, 1.832, -2.61]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={placeCapsule}
      >
        <meshBasicMaterial
          attach="material"
          color={"yellow"}
          transparent
          opacity={gameState === 3 ? 1 : 0}
        />
      </Plane>

      <group>
        {capsules.map((capsule) => (
          <RigidBody
            key={capsule.key}
            ref={addCapsuleRef}
            name={capsule.key}
            userData={{ ...capsule }}
            onPointerDown={(e) => onClickCapsule(e, capsule)}
            position={capsule.position}
            includeInvisible
            colliders={false}
          >
            <NesCapsule color={capsule.owner.capsuleSkin} />
          </RigidBody>
        ))}
      </group>
    </>
  );
};
