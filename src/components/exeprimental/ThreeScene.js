"use client";

import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {CameraControls, ScrollControls, useGLTF} from "@react-three/drei";
import { getProject } from "@theatre/core";
import { SheetProvider } from "@theatre/r3f";
import studio from "@theatre/studio";
import extension from '@theatre/r3f/dist/extension'
import {Overlay} from "@/components/exeprimental/Overlay";
import {Crow} from "@/components/exeprimental/Crow_low_ploy";


const DEG45 = Math.PI / 4;

studio.initialize()
studio.extend(extension)

export function ThreeScene() {
    const demoSheet = getProject("Demo Project").sheet("Demo Sheet");
    const cameraControlRef = useRef(null);

    useEffect(() => {
        // Vérifie périodiquement si la ref est prête
        const checkRef = () => {
            if (cameraControlRef.current) {
                console.log("boop")
                const controls = cameraControlRef.current;

                controls.mouseButtons.left = 1;
                controls.mouseButtons.middle = 0;
                controls.mouseButtons.right = 0;
                controls.mouseButtons.wheel = 0;

                controls.touches.one = 1;
                controls.touches.two = 2;
                controls.touches.three = 3;


            } else {
                // Réessaie au prochain frame
                requestAnimationFrame(checkRef);
            }
        };
        checkRef();
    }, []);
    return (
        <>
            <Canvas
            >
                <SheetProvider sheet={demoSheet}>
                    <CameraControls ref={cameraControlRef} enableZoom={false} />
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />

                    <ScrollControls pages={3}>
                        <Overlay  cameraRef={cameraControlRef}/>
                        <Crow/>
                    </ScrollControls>
                </SheetProvider>
            </Canvas>

        </>
    );
}
