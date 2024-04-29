import React, { useRef, useState } from "react";
import {
  Box,
  Environment,
  OrbitControls,
  Sphere,
  Torus,
  useHelper,
} from "@react-three/drei";
import { BallCollider, CuboidCollider, RigidBody } from "@react-three/rapier";

const Examples = () => {
  const [hover, setHover] = useState(false);
  const toref = useRef();

  // Force upwards
  const jump = () => {
    toref.current.applyImpulse({ x: 0, y: 25, z: 0 }, true);
  };

  return (
    <>
      <RigidBody position={[3, 10, 0]} colliders={"ball"}>
        <Sphere>
          <meshStandardMaterial color="hotpink" />
        </Sphere>
      </RigidBody>

      <RigidBody position={[3, 5, 0]}>
        <Box>
          <meshStandardMaterial color="royalblue" />
        </Box>
      </RigidBody>

      <RigidBody position={[3, 8, 0]} colliders={false}>
        <CuboidCollider args={[0.5, 0.5, 0.5]} />
        {/* <BallCollider args={[1]} position={[0,1,0]} /> */}
        <Box position-y={1}>
          <meshStandardMaterial color="gold" />
        </Box>
      </RigidBody>

      {/* <RigidBody position={[2,5,0]} colliders={"hull"}> */}
      <RigidBody position={[-3.19, 3.41, 3.33]} colliders={"hull"} ref={toref}>
        <Torus
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onClick={jump}
        >
          <meshStandardMaterial color={hover ? "pink" : "orange"} />
        </Torus>
      </RigidBody>
    </>
  );
};

export default Examples;
