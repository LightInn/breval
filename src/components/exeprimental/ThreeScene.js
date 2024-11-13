"use client"


import {getProject} from "@theatre/core";
import React, {useEffect, useRef} from 'react'
import {Canvas} from "@react-three/fiber";

import {editable as e, PerspectiveCamera, SheetProvider} from '@theatre/r3f'


import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import {OrbitControls, PresentationControls, ScrollControls, useAnimations, useGLTF} from "@react-three/drei";
import {Overlay} from "@/components/exeprimental/Overlay";
import {Crow} from "@/components/exeprimental/Crow_low_ploy";
studio.initialize()
studio.extend(extension)

export function ThreeScene() {



    const demoSheet = getProject('Demo Project').sheet('Demo Sheet')



    return (
        <Canvas>
            <SheetProvider sheet={demoSheet}>
                <PresentationControls   enabled={true} />
                {/*<OrbitControls enableZoom={false}  target={[-1.664, 13.726, -2.339]}  />*/}
                <PerspectiveCamera theatreKey="Camera" makeDefault  fov={75} />
                <ambientLight />

                <pointLight theatreKey="Light" position={[10, 10, 10]} />

                <ScrollControls pages={3}  >
                    <Overlay/>

                    {/*<e.mesh theatreKey="Cube">*/}
                    {/*    <boxGeometry args={[1, 1, 1]}/>*/}
                    {/*    <meshStandardMaterial color="orange"/>*/}
                    {/*</e.mesh>*/}
                    {/*<MyMesh/>*/}
                    <Crow/>
                </ScrollControls>
            </SheetProvider>
        </Canvas>
    )
}

useGLTF.preload('/crow_low_ploy.glb')

function MyMesh(props) {


    const demoSheet = getProject('Demo Project').sheet('Demo Sheet')

    const group = useRef()
    const {nodes, materials, animations} = useGLTF('/crow_low_ploy.glb')
    const {actions} = useAnimations(animations, group)


    console.log(actions)

    useEffect(() => {

        actions["Cube.002Action"].play()
    })



    return (

        <group ref={group} {...props} dispose={null}>
            <meshStandardMaterial color="orange"/>
            <group name="Scene">
                <mesh
                    name="Mball005"
                    geometry={nodes.Mball005.geometry}
                    material={nodes.Mball005.material}
                    position={[1.14739, 1.46852, 0]}
                    scale={1.13331}
                />
                <mesh
                    name="Cube"
                    geometry={nodes.Cube.geometry}
                    material={nodes.Cube.material}
                    position={[-0.0704, -3.24578, 0.62365]}
                    rotation={[0.24572, -0.72212, 0.4932]}
                    scale={0.05539}
                />
                <mesh
                    name="Cube001"
                    geometry={nodes.Cube001.geometry}
                    material={nodes.Cube001.material}
                    position={[0.62355, -3.14372, -0.74384]}
                    rotation={[0.5776, -0.68354, 0.57543]}
                    scale={0.05539}
                />
                <mesh
                    name="Cube002"
                    geometry={nodes.Cube002.geometry}
                    material={nodes.Cube002.material}
                    position={[-1.20478, 0, 0.07087]}
                />
                <mesh
                    name="Cube003"
                    geometry={nodes.Cube003.geometry}
                    material={nodes.Cube003.material}
                    position={[1.71172, 0, -1.36665]}
                    scale={[1, 0.29852, 1]}
                />
                <mesh
                    name="Cube004"
                    geometry={nodes.Cube004.geometry}
                    material={nodes.Cube004.material}
                    position={[2.01193, 0, -2.03105]}
                    rotation={[0, -0.58839, 0]}
                    scale={[0.86195, 0.25731, 0.86195]}
                />
                <mesh
                    name="Cube005"
                    geometry={nodes.Cube005.geometry}
                    material={nodes.Cube005.material}
                    position={[2.58282, 0, -2.88247]}
                    rotation={[0, -0.03022, 0]}
                    scale={[0.6402, 0.19111, 0.6402]}
                />
                <mesh
                    name="Cube006"
                    geometry={nodes.Cube006.geometry}
                    material={nodes.Cube006.material}
                    position={[2.86335, 0, -3.28603]}
                    rotation={[0, -0.43455, 0]}
                    scale={[0.54231, 0.16189, 0.54231]}
                />
            </group>
        </group>
    )
}