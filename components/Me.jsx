import React, {useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import {useGLTF} from '@react-three/drei'


export function MeModel(props) {
    const mesh = useRef(null)
    useFrame((state, delta) => {
        mesh.current.rotation.y += 0.03 * delta
        mesh.current.rotation.x = 0.35
    })

    const {nodes, materials} = useGLTF('/moi.gltf')


    return (
        <group ref={mesh} {...props} dispose={null}>
            <group position={[0, 0.2, 0.08]} rotation={[0, -0.75, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Wolf3D_Head001_1.geometry}
                    material={materials.Wolf3D_Skin}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Wolf3D_Head001_2.geometry}
                    material={materials.Wolf3D_Eye}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Wolf3D_Head001_3.geometry}
                    material={materials.Wolf3D_Glasses}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Wolf3D_Head001_4.geometry}
                    material={materials.Wolf3D_Hair}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Wolf3D_Head001_5.geometry}
                    material={materials.Wolf3D_Outfit_Top}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Wolf3D_Head001_6.geometry}
                    material={materials.Wolf3D_Outfit_Bottom}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Wolf3D_Head001_7.geometry}
                    material={materials.Wolf3D_Body}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Wolf3D_Head001_8.geometry}
                    material={materials.Wolf3D_Outfit_Footwear}
                />
            </group>
        </group>

    )
}


export function LightSceneModel(props) {
    const mesh = useRef(null)
    useFrame((state, delta) => {

        mesh.current.rotation.x = 0.5
    })

    const {nodes, materials} = useGLTF('/moi.gltf')


    return (
        <group ref={mesh} {...props} dispose={null}>
            <group position={[-0.67, 0.48, 0.93]} scale={0.58}>
                <pointLight
                    intensity={2}
                    decay={2}
                    color='#0100ff'
                    rotation={[-Math.PI / 2, 0, 0]}
                />
            </group>
            <group position={[0.27, 0.83, 1]} scale={0.58}>
                <pointLight
                    intensity={2}
                    decay={2}
                    color='#ffecdd'
                    rotation={[-Math.PI / 2, 0, 0]}
                />
            </group>
            <group position={[0.42, 0.59, -0.68]} scale={0.58}>
                <pointLight
                    intensity={2}
                    decay={2}
                    color='#ff4da0'
                    rotation={[-Math.PI / 2, 0, 0]}
                />
            </group>
        </group>

    )
}

useGLTF.preload('/moi.gltf')

