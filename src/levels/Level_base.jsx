import { RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";

const Level_base = () => {
  return (
    <group>
      <RigidBody type="fixed">
        <Box position={[0, 1, 0]} args={[10, 0.1, 10]}>
          <meshStandardMaterial color="grey" />
        </Box>
      </RigidBody>
      <RigidBody type="fixed">
        <Box position={[0, 1, 5]} args={[10, 1.5, 0.1]}>
          <meshStandardMaterial color="grey" />
        </Box>
      </RigidBody>
      <RigidBody type="fixed">
        <Box position={[5, 1, 0]} args={[0.1, 1.5, 10]}>
          <meshStandardMaterial color="grey" />
        </Box>
      </RigidBody>
    </group>
  );
};

export default Level_base;
