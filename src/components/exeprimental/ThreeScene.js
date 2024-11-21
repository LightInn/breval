"use client";

import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
    CameraControls,
    Environment,
    GizmoHelper,
    GizmoViewport, PerspectiveCamera,
    PivotControls,
    ScrollControls,
    useGLTF
} from "@react-three/drei";
import {Overlay} from "@/components/exeprimental/Overlay";
import {Crow} from "@/components/exeprimental/Crow_low_ploy";
import { useControls, button, buttonGroup, folder } from 'leva'
import * as THREE from 'three'

const { DEG2RAD } = THREE.MathUtils

export function ThreeScene() {
    const cameraControlRef = useRef(null);


    // All same options as the original "basic" example: https://yomotsu.github.io/camera-controls/examples/basic.html
    const { minDistance, enabled, verticalDragToForward, dollyToCursor, infinityDolly } = useControls({
        thetaGrp: buttonGroup({
            label: 'rotate theta',
            opts: {
                '+45º': () => cameraControlRef.current?.rotate(45 * DEG2RAD, 0, true),
                '-90º': () => cameraControlRef.current?.rotate(-90 * DEG2RAD, 0, true),
                '+360º': () => cameraControlRef.current?.rotate(360 * DEG2RAD, 0, true)
            }
        }),
        phiGrp: buttonGroup({
            label: 'rotate phi',
            opts: {
                '+20º': () => cameraControlRef.current?.rotate(0, 20 * DEG2RAD, true),
                '-40º': () => cameraControlRef.current?.rotate(0, -40 * DEG2RAD, true)
            }
        }),
        truckGrp: buttonGroup({
            label: 'truck',
            opts: {
                '(1,0)': () => cameraControlRef.current?.truck(1, 0, true),
                '(0,1)': () => cameraControlRef.current?.truck(0, 1, true),
                '(-1,-1)': () => cameraControlRef.current?.truck(-1, -1, true)
            }
        }),
        dollyGrp: buttonGroup({
            label: 'dolly',
            opts: {
                '1': () => cameraControlRef.current?.dolly(1, true),
                '-1': () => cameraControlRef.current?.dolly(-1, true)
            }
        }),
        zoomGrp: buttonGroup({
            label: 'zoom',
            opts: {
                '/2': () => cameraControlRef.current?.zoom(camera.zoom / 2, true),
                '/-2': () => cameraControlRef.current?.zoom(-camera.zoom / 2, true)
            }
        }),
        minDistance: { value: 0 },
        moveTo: folder(
            {
                vec1: { value: [3, 5, 2], label: 'vec' },
                'moveTo(…vec)': button((get) => cameraControlRef.current?.moveTo(...get('moveTo.vec1'), true))
            },
            { collapsed: true }
        ),
        'fitToBox(mesh)': button(() => cameraControlRef.current?.fitToBox(meshRef.current, true)),
        setPosition: folder(
            {
                vec2: { value: [-5, 2, 1], label: 'vec' },
                'setPosition(…vec)': button((get) => cameraControlRef.current?.setPosition(...get('setPosition.vec2'), true))
            },
            { collapsed: true }
        ),
        setTarget: folder(
            {
                vec3: { value: [3, 0, -3], label: 'vec' },
                'setTarget(…vec)': button((get) => cameraControlRef.current?.setTarget(...get('setTarget.vec3'), true))
            },
            { collapsed: true }
        ),
        setLookAt: folder(
            {
                vec4: { value: [1, 2, 3], label: 'position' },
                vec5: { value: [1, 1, 0], label: 'target' },
                'setLookAt(…position, …target)': button((get) => cameraControlRef.current?.setLookAt(...get('setLookAt.vec4'), ...get('setLookAt.vec5'), true))
            },
            { collapsed: true }
        ),
        lerpLookAt: folder(
            {
                vec6: { value: [-2, 0, 0], label: 'posA' },
                vec7: { value: [1, 1, 0], label: 'tgtA' },
                vec8: { value: [0, 2, 5], label: 'posB' },
                vec9: { value: [-1, 0, 0], label: 'tgtB' },
                t: { value: Math.random(), label: 't', min: 0, max: 1 },
                'f(…posA,…tgtA,…posB,…tgtB,t)': button((get) => {
                    return cameraControlRef.current?.lerpLookAt(
                        ...get('lerpLookAt.vec6'),
                        ...get('lerpLookAt.vec7'),
                        ...get('lerpLookAt.vec8'),
                        ...get('lerpLookAt.vec9'),
                        get('lerpLookAt.t'),
                        true
                    )
                })
            },
            { collapsed: true }
        ),
        saveState: button(() => cameraControlRef.current?.saveState()),
        reset: button(() => cameraControlRef.current?.reset(true)),
        enabled: { value: true, label: 'controls on' },
        verticalDragToForward: { value: false, label: 'vert. drag to move forward' },
        dollyToCursor: { value: false, label: 'dolly to cursor' },
        infinityDolly: { value: false, label: 'infinity dolly' }
    })


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

    const Bloup = () => {
        // console.log( cameraControlRef.current._position0)
        // console.log( cameraControlRef.current._target0)
        console.log( cameraControlRef.current.camera.position)
    }
    return (
        <>
            <Canvas>

                    <Environment preset="dawn"  backgroundBlurriness={0.5} />
                    {/* log camera position */}
                    <CameraControls ref={cameraControlRef}   onChange={(e) => Bloup()} />
                    <PivotControls>
                        <PerspectiveCamera makeDefault={true} position={[3.8,13.2,-10.6]} rotation={[0.2,3.1,0]} />
                    </PivotControls>

                    {/*<ambientLight />*/}

                    <GizmoHelper
                        alignment="bottom-right" // widget alignment within scene
                        margin={[80, 80]} // widget margins (X, Y)
                        // onUpdate={/* called during camera animation  */}
                        // onTarget={/* return current camera target (e.g. from orbit controls) to center animation */}
                        // renderPriority={/* use renderPriority to prevent the helper from disappearing if there is another useFrame(..., 1)*/}
                    >
                        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
                        {/* alternative: <GizmoViewcube /> */}
                    </GizmoHelper>

                    <ScrollControls pages={3}>
                        <Overlay  cameraRef={cameraControlRef}/>
                        <Crow/>
                    </ScrollControls>

            </Canvas>

        </>
    );
}
