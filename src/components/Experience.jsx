import { OrbitControls } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useState } from "react";
import { Vector3 } from "three";
import { NesCapsule } from "./NesCapsule";
import { NesTable } from "./NesTable";
import { useGameStore } from "../store/store";
import Level_base from "../levels/level_base";

export const Experience = () => {
  // const [capsuleRefs] = useState([]);
  // const addCapsuleRef = (ref) => capsuleRefs.push(ref);
  const capsuleRefs = useGameStore((state) => state.capsuleRefs);
  const addCapsuleRef = useGameStore((state) => state.addCapsuleRef);

  const capsules = useGameStore((state) => state.capsules);
  const isDragging = useGameStore((state) => state.isDragging);
  const draggedCapsule = useGameStore((state) => state.draggedCapsule);
  const setIsDragging = useGameStore((state) => state.setIsDragging);
  const setDraggedCapsule = useGameStore((state) => state.setDraggedCapsule);

  const withinScoreZone = useGameStore((state) => state.withinScoreZone);
  const setWithinScoreZone = useGameStore((state) => state.setWithinScoreZone);
  const removeWithinScoreZone = useGameStore(
    (state) => state.removeWithinScoreZone
  );

  const getRigidBodyFromRefs = (rb) => {
    return capsuleRefs.find((cap) => cap.userData.key === rb.key);
  };

  const shootAction = (e) => {
    // console.log("shootAction e -", e);

    if (isDragging && draggedCapsule) {
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
    }

    setDraggedCapsule(null);
    setIsDragging(false);
  };

  const onClickCapsule = (e, capsule) => {
    e.stopPropagation();
    const foundCapsule = getRigidBodyFromRefs(capsule);
    if (foundCapsule) {
      setDraggedCapsule(foundCapsule);
      setIsDragging(true);
    }
  };

  const onCapsuleCollision = (manifold, target, other) => {
    console.log("Collision at world position ", manifold.solverContactPoint(0));
    if (other.rigidBodyObject) {
      console.log(
        target.rigidBodyObject.name,
        " collided with ",
        other.rigidBodyObject.name
      );
    }
  };

  const onEnterScoreZone = (e) => {
    if (e.other.rigidBodyObject.name.startsWith("capsule")) {
      console.log("onEnterScoreZone e", e.other.rigidBodyObject.name);
      const foundCapsule = capsuleRefs.find(
        (cap) => cap.userData.key === e.other.rigidBodyObject.name
      );
      console.log("onEnterScoreZone foundCapsule", foundCapsule);
      if (foundCapsule) {
        setWithinScoreZone(foundCapsule);
      }
    }
  };

  const onExitScoreZone = (e) => {
    if (e.other.rigidBodyObject.name.startsWith("capsule")) {
      console.log("onExitScoreZone e", e.other.rigidBodyObject.name);
      const foundCapsule = withinScoreZone.find(
        (cap) => cap.userData.key === e.other.rigidBodyObject.name
      );
      if (foundCapsule) {
        removeWithinScoreZone(foundCapsule);
      }
    }
  };

  return (
    <>

      <Level_base />
      <RigidBody
        name="NesTable"
        position={[0, 0, 0]}
        type="fixed"
        colliders={"hull"}
        onPointerUp={(e) => shootAction(e)}
      >
        <NesTable position-y={1} />
      </RigidBody>

      <RigidBody name="ScoreZone" position={[0, 3, 2.667]} type="fixed">
        <CuboidCollider
          args={[1.6, 0.25, 0.33]}
          // args={[5, 5, 5]}
          sensor
          onIntersectionEnter={(e) => onEnterScoreZone(e)}
          onIntersectionExit={(e) => onExitScoreZone(e)}
        />
      </RigidBody>

      <group>
        {capsules.map((capsule) => (
          <RigidBody
            key={capsule.key}
            ref={addCapsuleRef}
            name={capsule.key}
            userData={{ name: capsule.name, key: capsule.key }}
            onPointerDown={(e) => onClickCapsule(e, capsule)}
            position={capsule.position}
            colliders={false}
            includeInvisible
            // onCollisionEnter={({ manifold, target, other }) =>
            //   onCapsuleCollision(manifold, target, other)
            // }
          >
            <NesCapsule color={capsule.color} />
          </RigidBody>
        ))}
      </group>
    </>
  );
};
