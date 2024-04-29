import { Box, Environment, OrbitControls, useHelper } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { DirectionalLightHelper } from "three";
import { NesCapsule } from "./NesCapsule";
import { NesTable } from "./NesTable";
import CameraPositionHelper from "../helpers/CameraPositionHelper";
import { useGameStore } from "../store/store";
import Level_base from "../levels/level_base";

export const Experience = () => {
  const dirLightRef = useRef();
  const [lightPos, setLightPos] = useState([25, 18, -25]);
  useHelper(dirLightRef, DirectionalLightHelper, 0.5);
  const capsules = useGameStore((state) => state.capsules);

  const [capsuleRefs] = useState([]);
  const addCapsuleRef = (ref) => capsuleRefs.push(ref);

  const handlePush = (e, key) => {
    e.stopPropagation();
    const target = capsuleRefs.filter((cap) => cap.userData.key === key)
    target[0]?.applyImpulse({ x: 0, y: 0, z: 0.0034}, true);
  };

  return (
    <>
      <OrbitControls />
      <CameraPositionHelper event={"mousedown"} />
      <directionalLight
        ref={dirLightRef}
        position={lightPos}
        intensity={0.3}
        castShadow
        shadow-camera-near={0}
        shadow-camera-far={80}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-bias={-0.0001}
      />

      <Level_base />

      {/* <Examples /> */}
      <RigidBody position={[0, 0, 0]} type="fixed" colliders={"hull"}>
        <NesTable position-y={1} />
      </RigidBody>

      <group>
        {capsules.map((capsule) => (
          <RigidBody
            key={capsule.key}
            ref={addCapsuleRef}
            userData={{key: capsule.key}}
            onClick={(e) => handlePush(e, capsule.key)}
            position={capsule.position}
            colliders={false}
            includeInvisible
            onCollisionEnter={({ manifold, target, other }) => {
              // console.log(
              //   "Collision at world position ",
              //   manifold.solverContactPoint(0)
              // );
              if (other.rigidBodyObject) {
                // console.log(
                //   target.rigidBodyObject.name,
                //   " collided with ",
                //   other.rigidBodyObject.name
                // );
              }
            }}
          >
            <NesCapsule color={capsule.color} />
          </RigidBody>
        ))}
      </group>

      <Environment preset="sunset" />
    </>
  );
};
