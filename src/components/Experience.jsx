import { Plane } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { Vector3 } from "three";
import { NesCapsule } from "./NesCapsule";
import { NesTable } from "./NesTable";
import { useGameStore } from "../store/store";
// import Level_base from "../levels/level_base";
import { Level_office } from "../levels/level_office";
import { useFrame } from "@react-three/fiber";

export const Experience = () => {
  const setGameState = useGameStore((state) => state.setGameState);
  // const selectedLevel = useGameStore((state) => state.selectedLevel);

  const capsuleRefs = useGameStore((state) => state.capsuleRefs);
  const addCapsuleRef = useGameStore((state) => state.addCapsuleRef);

  const capsules = useGameStore((state) => state.capsules);
  const isDragging = useGameStore((state) => state.isDragging);
  const draggedCapsule = useGameStore((state) => state.draggedCapsule);
  const setIsDragging = useGameStore((state) => state.setIsDragging);
  const setDraggedCapsule = useGameStore((state) => state.setDraggedCapsule);
  const endTurn = useGameStore((state) => state.endTurn);
  const setWithinScoreZone = useGameStore((state) => state.setWithinScoreZone);
  const removeWithinScoreZone = useGameStore(
    (state) => state.removeWithinScoreZone
  );

  // let mousePosition = { x: 0, y: 0 };
  // const handleMouseMove = (e) => {
  //   mousePosition = { x: e.clientX, y: e.clientY };
  // };

  let nextTurnInterval = null;
  const onNextTurnInterval = () => {
    clearInterval(nextTurnInterval);
    endTurn();
  };

  const getRigidBodyFromRefs = (rb) => {
    return capsuleRefs.find((cap) => cap.userData.key === rb.key);
  };

  const onClickCapsule = (e, capsule) => {
    e.stopPropagation();
    const foundCapsule = getRigidBodyFromRefs(capsule);
    if (foundCapsule) {
      // window.addEventListener("mousemove", handleMouseMove);
      setDraggedCapsule(foundCapsule);
      setIsDragging(true);
      // setDraggedPosition(foundCapsule.translation());
    }
  };

  const shootAction = (e) => {
    if (isDragging && draggedCapsule) {
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

      const impulseFactor = 0.015;
      const impulseMagnitude = impulseFactor * distance;
      const impulse = direction.multiplyScalar(-impulseMagnitude);

      // console.log("distance:", distance);
      // console.log("impulseMagnitude:", impulseMagnitude);
      // console.log("impulse:", impulse);

      impulse.y = 0;

      draggedCapsule.applyImpulse(impulse, true);

      if (useGameStore.getState().gameState > 0)
        nextTurnInterval = setInterval(onNextTurnInterval, 4000);
    }

    setDraggedCapsule(null);
    setIsDragging(false);
    // window.removeEventListener("mousemove", handleMouseMove);
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

  useFrame((state, delta) => {
    if (isDragging && draggedCapsule) {
      const intersects = state.raycaster.intersectObjects(
        draggingPlane.current
      );

      // console.log("intersects", intersects);

      if (intersects.length) {
        setMousePosition(intersects[0].point);
      }
    }
  });

  const draggingPlane = useRef();

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

      <RigidBody name="scoreZone" position={[0, 2, 2.667]} type="fixed">
        <CuboidCollider
          args={[1.6, 0.25, 0.33]}
          sensor
          onIntersectionEnter={(e) => onEnterScoreZone(e)}
          onIntersectionExit={(e) => onExitScoreZone(e)}
        />
      </RigidBody>

      <Plane
        name="draggingPlane"
        ref={draggingPlane}
        args={[1000, 1000]}
        position={[0, 1.8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerUp={(e) => shootAction(e)}
      >
        <meshBasicMaterial attach="material" transparent opacity={0} />
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
