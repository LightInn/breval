'use client'

import React, { useEffect, useRef, useState } from 'react'

import { CameraControls, Environment, ScrollControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import { FlyingCrow } from '@/components/projects/Crow_fly'
import { Overlay } from '@/components/projects/Overlay'
import { Crow } from '@/components/projects/Crow_tree'

export function ThreeScene() {
	const [step, setStep] = useState(0)

	const testRef = useRef()

	useEffect(() => {
		console.log('step', step)
	}, [step])

	return (
		<>
			<Canvas>
				<Environment backgroundBlurriness={0.5} preset="dawn" />
				{/* log camera position */}
				<Rig step={step} />

				{/*<ambientLight />*/}

				<ScrollControls pages={3}>
					<Overlay setStep={setStep} step={step} />
					<Crow step={step} />

					{/*<PivotControls  ref={testRef} scale={8}>*/}
					<FlyingCrow step={step} test={testRef} />
					{/*</PivotControls>*/}
				</ScrollControls>
			</Canvas>
		</>
	)
}

function Rig({
	position = new THREE.Vector3(0, 0, 2),
	focus = new THREE.Vector3(0, 0, 0),
	step,
}) {
	const { controls, scene } = useThree()
	const cameraRef = useRef()

	// // All same options as the original "basic" example: https://yomotsu.github.io/camera-controls/examples/basic.html
	// const { minDistance, enabled, verticalDragToForward, dollyToCursor, infinityDolly } = useControls({
	//     thetaGrp: buttonGroup({
	//         label: 'rotate theta',
	//         opts: {
	//             '+45º': () => cameraRef.current?.rotate(45 * DEG2RAD, 0, true),
	//             '-90º': () => cameraRef.current?.rotate(-90 * DEG2RAD, 0, true),
	//             '+360º': () => cameraRef.current?.rotate(360 * DEG2RAD, 0, true)
	//         }
	//     }),
	//     phiGrp: buttonGroup({
	//         label: 'rotate phi',
	//         opts: {
	//             '+20º': () => cameraRef.current?.rotate(0, 20 * DEG2RAD, true),
	//             '-40º': () => cameraRef.current?.rotate(0, -40 * DEG2RAD, true)
	//         }
	//     }),
	//     truckGrp: buttonGroup({
	//         label: 'truck',
	//         opts: {
	//             '(1,0)': () => cameraRef.current?.truck(1, 0, true),
	//             '(0,1)': () => cameraRef.current?.truck(0, 1, true),
	//             '(-1,-1)': () => cameraRef.current?.truck(-1, -1, true)
	//         }
	//     }),
	//     dollyGrp: buttonGroup({
	//         label: 'dolly',
	//         opts: {
	//             '1': () => cameraRef.current?.dolly(1, true),
	//             '-1': () => cameraRef.current?.dolly(-1, true)
	//         }
	//     }),
	//     zoomGrp: buttonGroup({
	//         label: 'zoom',
	//         opts: {
	//             '/2': () => cameraRef.current?.zoom(camera.zoom / 2, true),
	//             '/-2': () => cameraRef.current?.zoom(-camera.zoom / 2, true)
	//         }
	//     }),
	//     minDistance: { value: 0 },
	//     moveTo: folder(
	//         {
	//             vec1: { value: [3, 5, 2], label: 'vec' },
	//             'moveTo(…vec)': button((get) => cameraRef.current?.moveTo(...get('moveTo.vec1'), true))
	//         },
	//         { collapsed: true }
	//     ),
	//     'fitToBox(mesh)': button(() => cameraRef.current?.fitToBox(meshRef.current, true)),
	//     setPosition: folder(
	//         {
	//             vec2: { value: [-5, 2, 1], label: 'vec' },
	//             'setPosition(…vec)': button((get) => cameraRef.current?.setPosition(...get('setPosition.vec2'), true))
	//         },
	//         { collapsed: true }
	//     ),
	//     setTarget: folder(
	//         {
	//             vec3: { value: [3, 0, -3], label: 'vec' },
	//             'setTarget(…vec)': button((get) => cameraRef.current?.setTarget(...get('setTarget.vec3'), true))
	//         },
	//         { collapsed: true }
	//     ),
	//     setLookAt: folder(
	//         {
	//             vec4: { value: [1, 2, 3], label: 'position' },
	//             vec5: { value: [1, 1, 0], label: 'target' },
	//             'setLookAt(…position, …target)': button((get) => cameraRef.current?.setLookAt(...get('setLookAt.vec4'), ...get('setLookAt.vec5'), true))
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
	//                 return cameraRef.current?.lerpLookAt(
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
	//     saveState: button(() => cameraRef.current?.saveState()),
	//     reset: button(() => cameraRef.current?.reset(true)),
	//     enabled: { value: true, label: 'controls on' },
	//     verticalDragToForward: { value: false, label: 'vert. drag to move forward' },
	//     dollyToCursor: { value: false, label: 'dolly to cursor' },
	//     infinityDolly: { value: false, label: 'infinity dolly' }
	// })

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

				camera.mouseButtons.left = 1
				camera.mouseButtons.middle = 0
				camera.mouseButtons.right = 0
				camera.mouseButtons.wheel = 0

				camera.touches.one = 1
				camera.touches.two = 2
				camera.touches.three = 3
			} else {
				requestAnimationFrame(disableZoom)
				console.log('no controls', controls)
			}
		}
		disableZoom()
	}, [])

	const bird = {
		y: 15.7,
		z: -2.6,
		x: 1.3,
	}

	const farView = {
		y: 15.5,
		z: -2.5,
		x: 6.8,
	}

	const sideView = {
		x: 50,
		y: 15,
		z: -3,
	}

	const origin = {
		x: 0,
		y: 0,
		z: 0,
	}

	useEffect(() => {
		// switch (step) for camera position
		if (controls && step === 1) {
			controls?.setLookAt(
				2.5,
				16.2,
				-18.5,
				farView.x,
				farView.y,
				farView.z,
				true
			)
		}
		if (controls && step === 2) {
			controls?.setLookAt(43, 17, 120, sideView.x, sideView.y, sideView.z, true)
		}
		if (controls && step === 3) {
			controls?.setLookAt(4.7, 3.2, 3.5, origin.x, origin.y, origin.z, true)
			// controls.enable = false;
			// controls.mouseButtons.left = 0;
		}
	}, [step])

	const Bloup = () => {
		// console.log( cameraControlRef.current._position0)
		// console.log( cameraControlRef.current._target0)
		// console.log(controls?.camera.position)
	}

	return (
		<CameraControls
			makeDefault
			maxPolarAngle={Math.PI / 2}
			minPolarAngle={0}
			onChange={e => Bloup()}
			ref={cameraRef}
		/>
	)
}
