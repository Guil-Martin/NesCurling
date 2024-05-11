import { RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";

const Level_base = () => {
  const onMouseUp = (e) => {
    // console.log("Floor mouseup e", e);
  };

  return (
    <group>
      <RigidBody
        type="fixed"
        userData={{ type: "floor" }}
        // onPointerUp={(e) => onMouseUp(e)}
      >
        <Box position={[0, 1, 0]} args={[50, 0.1, 50]}>
          <meshStandardMaterial color="grey" />
        </Box>
      </RigidBody>
    </group>
  );
};

export default Level_base;
