"use client";

import React, {useEffect, useRef, useState} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {
    CameraControls,
    Environment,
    GizmoHelper,
    GizmoViewport, PivotControls,
    ScrollControls,
    TransformControls
} from "@react-three/drei";
import {Overlay} from "@/components/exeprimental/Overlay";
import * as THREE from 'three'
import {FlyingCrow} from "@/components/exeprimental/Crow_fly";
import {Crow} from "@/components/exeprimental/Crow_low_ploy";

const {DEG2RAD} = THREE.MathUtils

export function ThreeScene() {

    const [step, setStep] = useState(0)

    const testRef = useRef()


    useEffect(() => {

        console.log("step", step)
    }, [step]);


    // All same options as the original "basic" example: https://yomotsu.github.io/camera-controls/examples/basic.html
    // const { minDistance, enabled, verticalDragToForward, dollyToCursor, infinityDolly } = useControls({
    //     thetaGrp: buttonGroup({
    //         label: 'rotate theta',
    //         opts: {
    //             '+45º': () => cameraControlRef.current?.rotate(45 * DEG2RAD, 0, true),
    //             '-90º': () => cameraControlRef.current?.rotate(-90 * DEG2RAD, 0, true),
    //             '+360º': () => cameraControlRef.current?.rotate(360 * DEG2RAD, 0, true)
    //         }
    //     }),
    //     phiGrp: buttonGroup({
    //         label: 'rotate phi',
    //         opts: {
    //             '+20º': () => cameraControlRef.current?.rotate(0, 20 * DEG2RAD, true),
    //             '-40º': () => cameraControlRef.current?.rotate(0, -40 * DEG2RAD, true)
    //         }
    //     }),
    //     truckGrp: buttonGroup({
    //         label: 'truck',
    //         opts: {
    //             '(1,0)': () => cameraControlRef.current?.truck(1, 0, true),
    //             '(0,1)': () => cameraControlRef.current?.truck(0, 1, true),
    //             '(-1,-1)': () => cameraControlRef.current?.truck(-1, -1, true)
    //         }
    //     }),
    //     dollyGrp: buttonGroup({
    //         label: 'dolly',
    //         opts: {
    //             '1': () => cameraControlRef.current?.dolly(1, true),
    //             '-1': () => cameraControlRef.current?.dolly(-1, true)
    //         }
    //     }),
    //     zoomGrp: buttonGroup({
    //         label: 'zoom',
    //         opts: {
    //             '/2': () => cameraControlRef.current?.zoom(camera.zoom / 2, true),
    //             '/-2': () => cameraControlRef.current?.zoom(-camera.zoom / 2, true)
    //         }
    //     }),
    //     minDistance: { value: 0 },
    //     moveTo: folder(
    //         {
    //             vec1: { value: [3, 5, 2], label: 'vec' },
    //             'moveTo(…vec)': button((get) => cameraControlRef.current?.moveTo(...get('moveTo.vec1'), true))
    //         },
    //         { collapsed: true }
    //     ),
    //     'fitToBox(mesh)': button(() => cameraControlRef.current?.fitToBox(meshRef.current, true)),
    //     setPosition: folder(
    //         {
    //             vec2: { value: [-5, 2, 1], label: 'vec' },
    //             'setPosition(…vec)': button((get) => cameraControlRef.current?.setPosition(...get('setPosition.vec2'), true))
    //         },
    //         { collapsed: true }
    //     ),
    //     setTarget: folder(
    //         {
    //             vec3: { value: [3, 0, -3], label: 'vec' },
    //             'setTarget(…vec)': button((get) => cameraControlRef.current?.setTarget(...get('setTarget.vec3'), true))
    //         },
    //         { collapsed: true }
    //     ),
    //     setLookAt: folder(
    //         {
    //             vec4: { value: [1, 2, 3], label: 'position' },
    //             vec5: { value: [1, 1, 0], label: 'target' },
    //             'setLookAt(…position, …target)': button((get) => cameraControlRef.current?.setLookAt(...get('setLookAt.vec4'), ...get('setLookAt.vec5'), true))
    //         },
    //         { collapsed: true }
    //     ),
    //     lerpLookAt: folder(
    //         {
    //             vec6: { value: [-2, 0, 0], label: 'posA' },
    //             vec7: { value: [1, 1, 0], label: 'tgtA' },
    //             vec8: { value: [0, 2, 5], label: 'posB' },
    //             vec9: { value: [-1, 0, 0], label: 'tgtB' },
    //             t: { value: Math.random(), label: 't', min: 0, max: 1 },
    //             'f(…posA,…tgtA,…posB,…tgtB,t)': button((get) => {
    //                 return cameraControlRef.current?.lerpLookAt(
    //                     ...get('lerpLookAt.vec6'),
    //                     ...get('lerpLookAt.vec7'),
    //                     ...get('lerpLookAt.vec8'),
    //                     ...get('lerpLookAt.vec9'),
    //                     get('lerpLookAt.t'),
    //                     true
    //                 )
    //             })
    //         },
    //         { collapsed: true }
    //     ),
    //     saveState: button(() => cameraControlRef.current?.saveState()),
    //     reset: button(() => cameraControlRef.current?.reset(true)),
    //     enabled: { value: true, label: 'controls on' },
    //     verticalDragToForward: { value: false, label: 'vert. drag to move forward' },
    //     dollyToCursor: { value: false, label: 'dolly to cursor' },
    //     infinityDolly: { value: false, label: 'infinity dolly' }
    // })




    return (<>
        <Canvas>

            <Environment preset="dawn" backgroundBlurriness={0.5}/>
            {/* log camera position */}
            <Rig step={step}/>


            {/*<ambientLight />*/}

            <GizmoHelper
                alignment="bottom-right" // widget alignment within scene
                margin={[80, 80]} // widget margins (X, Y)
                // onUpdate={/* called during camera animation  */}
                // onTarget={/* return current camera target (e.g. from orbit controls) to center animation */}
                // renderPriority={/* use renderPriority to prevent the helper from disappearing if there is another useFrame(..., 1)*/}
            >
                <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black"/>
                {/* alternative: <GizmoViewcube /> */}
            </GizmoHelper>

            <ScrollControls pages={3}>
                <Overlay step={step} setStep={setStep}/>
                <Crow step={step}/>


                {/*<PivotControls  ref={testRef} scale={8}>*/}
                    <FlyingCrow  test={testRef} step={step} />
                {/*</PivotControls>*/}


            </ScrollControls>

        </Canvas>

    </>);
}

function Rig({position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0), step}) {
    const {controls, scene} = useThree()
    const cameraRef = useRef()


    // const [, params] = useRoute('/item/:id')
    // useEffect(() => {
    //     const active = scene.getObjectByName(params?.id)
    //     if (active) {
    //         active.parent.localToWorld(position.set(0, 0.5, 0.25))
    //         active.parent.localToWorld(focus.set(0, 0, -2))
    //     }
    //     controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
    // })

    useEffect(() => {

        const disableZoom = () => {
            if (cameraRef.current) {

                const camera = cameraRef.current

                camera.mouseButtons.left = 1;
                camera.mouseButtons.middle = 0;
                camera.mouseButtons.right = 0;
                camera.mouseButtons.wheel = 0;

                camera.touches.one = 1;
                camera.touches.two = 2;
                camera.touches.three = 3;
            } else {
                requestAnimationFrame(disableZoom)
                console.log("no controls", controls)
            }
        }
        disableZoom()


    }, []);


    const bird = {
        x: 1.3, y: 15.7, z: -2.6
    }

    const farView = {
        x: 6.8, y: 15.5, z: -2.5
    }

    const sideView = {
        x: 50, y: 15, z: -3
    }

    const origin = {
        x: 0, y: 0, z: 0
    }


    useEffect(() => {

        // switch (step) for camera position
        if (controls && step === 1) {
            controls?.setLookAt(2.5, 16.2, -18.5, farView.x, farView.y, farView.z, true)
        }
        if (controls && step === 2) {
            controls?.setLookAt(43, 17, 120, sideView.x, sideView.y, sideView.z, true)
            controls.enable = true;
        }
        if (controls && step === 3) {
            controls?.setLookAt(4.7, 3.2, 3.5, origin.x, origin.y, origin.z, true)
            controls.enable = false;

        }


    }, [step]);

    const Bloup = () => {
        // console.log( cameraControlRef.current._position0)
        // console.log( cameraControlRef.current._target0)
        // console.log(controls?.camera.position)
    }


    return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} onChange={(e) => Bloup()}
                           ref={cameraRef}/>
}
