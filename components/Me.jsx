import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'


export default function Model(props) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => {
    // @ts-ignore
    mesh.current.rotation.y += 0.05 * delta
  })

  const { nodes, materials } = useGLTF('/moi.gltf')


  return (
    <group ref={mesh} {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name='EyeLeft'
        geometry={nodes.EyeLeft.geometry}
        material={nodes.EyeLeft.material}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name='EyeRight'
        geometry={nodes.EyeRight.geometry}
        material={nodes.EyeRight.material}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={nodes.Wolf3D_Glasses.material}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses001.geometry}
        material={nodes.Wolf3D_Glasses001.material}
        skeleton={nodes.Wolf3D_Glasses001.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        name='Wolf3D_Head'
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        name='Wolf3D_Teeth'
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <group position={[-0.09, 1.68, 0.63]}>
        <pointLight
          intensity={33.4}
          decay={2}
          color='#0100ff'
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
      <group position={[-0.32, 2.27, 0.45]}>
        <pointLight
          intensity={46.3}
          decay={2}
          color='#ffecdd'
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
      <group position={[0.51, 1.86, -1.14]}>
        <pointLight
          intensity={46.3}
          decay={2}
          color='#ff4da0'
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
    </group>

  )
}

useGLTF.preload('/moi.gltf')

