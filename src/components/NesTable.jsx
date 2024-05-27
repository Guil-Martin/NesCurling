/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\public\models\table.glb 
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function NesTable(props) {
  const { nodes, materials } = useGLTF(`${import.meta.env.BASE_URL}models/nesTable.glb`);
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.nesTable_basic.geometry}
        material={materials.M_table}
      />
    </group>
  );
}

useGLTF.preload(`${import.meta.env.BASE_URL}models/nesTable.glb`);