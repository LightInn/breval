import React, {useRef, useState} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {PerspectiveCamera, OrbitControls} from '@react-three/drei';
import {Head} from "next/document";
import {Vector3} from 'three';
import {useLoader} from '@react-three/fiber'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {useGLTF} from "@react-three/drei";


function Model(props: any) {
    const group = useRef();
    const {nodes, materials} = useGLTF("/suzanne.gltf");

    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                // @ts-ignore
                geometry={nodes.Suzanne.geometry}
                // @ts-ignore
                material={nodes.Suzanne.material}
                position={[0, 0.19, -0.04]}
            />
        </group>
    );
}

useGLTF.preload("/suzanne.gltf");


function Box(props: any) {
    const mesh = useRef(null)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    useFrame((state, delta) => {
        // @ts-ignore
        mesh.current.rotation.x += 0.5 * delta;
    })
    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 2 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}/>
        </mesh>
    )
}


export default function Home() {


    return (
        <div>

            <Canvas>
                <OrbitControls makeDefault position={new Vector3(0, 0, 5)}/>
                <ambientLight/>
                <pointLight position={[10, 10, 10]}/>

                <Box position={[-2.2, -2, 0]}/>
                <Model/>


            </Canvas>


            <nav>

                <p>brev.al</p>

                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Project</li>
                    <li>Resume</li>
                    <li>Social</li>
                </ul>
            </nav>


            <section>

                <p>Hi !</p>
                <h1>I'm Bréval Le Floch</h1>
                <h2>A developper</h2>


                {/*// Figure here*/}

            </section>


            <section>
                <p>Let me introduce myself</p>


                <p>I'm a french studend living Nantes, I have a few dreams and I loved computering the moment I touched
                    my first pc at 4yo </p>
                <p>You know, their is a lot of things to learn and understand in the universe, and for me, computering
                    is just like another universe opening to us, with every thig to explore</p>
            </section>


        </div>
    )
}

