"use client";
import * as THREE from 'three';
import {Canvas, useFrame} from '@react-three/fiber';
import {
    Billboard,
    Html,
    MeshPortalMaterial,
    OrbitControls,
    Preload,
    Stars,
    Octahedron,
    PresentationControls
} from '@react-three/drei';
import {useRef, useState} from 'react';
import {Model} from "@/components/exeprimental/Crow_fly";
import {red} from "next/dist/lib/picocolors";

export default function App() {
    return (<Canvas camera={{fov: 75, position: [0, 0, 5]}} style={{height: '100vh'}}>
            <color attach="background" args={['#1e293b']}/>
            <ambientLight intensity={0.5}/>
            <pointLight position={[10, 10, 10]}/>
          <PresentationControls>
            {/* Cube avec portail */}
            <CubeWithPortal position={[0, 0, 0]}/>
          </PresentationControls>

            <Preload all/>
        </Canvas>);
}

function CubeWithPortal({position}) {


    const portalRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state, delta) => {
        if (portalRef.current) {
            portalRef.current.blend = hovered ? 1 : 0;
        }
    });

    const bg = "#1e293b";

    return (<group position={position}>
            {/* Cube avec MeshPortalMaterial */}
            {/*<Stars fade={true}/>*/}
            <color attach="background" args={[bg]}/>
            <mesh
                // onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={[2, 2, 2]}
            >
                <Model/>
                <color attach="background" args={[bg]}/>

                <MeshPortalMaterial ref={portalRef} side={THREE.DoubleSide} attach="material">
                    {/* Arrière-plan du portail */}

                    <color attach="background" args={[bg]}/>
                    {/* Contenu dans le portail */}

                    <Billboard>

                        {/*<Octahedron scale={2} />*/}

                        <Html transform position={[0, 0, -5]} occlude={"blending"} style={{background: "#000"}}>
                            <div
                                style={{
                                    width: '100vw',
                                    height: '100vh',
                                    background: '#1e3a8a',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    textAlign: 'center',
                                    padding: '10px',
                                }}
                            >
                                <h1>Contenu secret</h1>
                                <p>Cliquez pour explorer davantage !</p>
                                <button
                                    style={{
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        background: '#f97316',
                                        color: 'white',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => alert('Vous avez cliqué !')}
                                >
                                    Découvrir
                                </button>
                            </div>
                        </Html>
                    </Billboard>
                </MeshPortalMaterial>
            </mesh>
        </group>);
}
