import React, {useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import {useGLTF} from '@react-three/drei'


export function MeModel(props) {
    const mesh = useRef(null)
    useFrame((state, delta) => {
        mesh.current.rotation.y += 0.03 * delta
        mesh.current.rotation.x = 0.35
    })

    const { nodes, materials } = useGLTF("/cristall.glb");
    return (
        <group     ref={mesh} {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.cristall.geometry}
                material={materials.Material}
                position={[0.0, -0.4, 0.0]}
                rotation={[-2.84, 0.78, 2.97]}
                scale={0.2}
            />
        </group>
    );
}


export function LightSceneModel(props) {
    const mesh = useRef(null)
    useFrame((state, delta) => {

        mesh.current.rotation.x = 0.5
    })

    const { nodes, materials } = useGLTF("/cristall.glb");


    return (
        <group ref={mesh} {...props} dispose={null}>
            <group position={[-0.67, 0.48, 0.93]} scale={0.58}>
                <pointLight
                    intensity={1}
                    decay={2}
                    color='#4dffa0'
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
                    intensity={0.5}
                    decay={2}
                    color='#0100ff'
                    rotation={[-Math.PI / 2, 0, 0]}
                />
            </group>
        </group>

    )
}

useGLTF.preload('/cristall.glb')

