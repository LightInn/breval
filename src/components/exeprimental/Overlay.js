"use client"

import {Scroll, useScroll} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {useEffect, useState} from "react";

export function Overlay({cameraRef}) {


    const [step, setStep] = useState(0)


    const data = useScroll()

    console.log("test", cameraRef)


    useEffect(() => {

        // switch (step) for camera position
        if (cameraRef && step === 1) {
            cameraRef.current?.setLookAt(1,2,3, 0, 0, 0, true)
        }
        if (cameraRef && step === 2) {
            cameraRef.current?.setLookAt(4,5,6, 0, 0, 0, true)
        }
        if (cameraRef && step === 3) {
            cameraRef.current?.setLookAt(7,8,9, 0, 0, 0, true)
        }


    }, [step]);


    useFrame(() => {
        // data.offset = current scroll position, between 0 and 1, dampened
        // data.delta = current delta, between 0 and 1, dampened

        // Will be 0 when the scrollbar is at the starting position,
        // then increase to 1 until 1 / 3 of the scroll distance is reached
        const a = data.range(0, 1 / 2)
        // Will start increasing when 1 / 3 of the scroll distance is reached,
        // and reach 1 when it reaches 2 / 3rds.
        const b = data.range(1 / 2, 1 / 2)

        // udapte step
        if (a >= 1 && step < 1) {
            setStep(1)
        }
        if (b >= 1 && step < 2) {
            setStep(2)
        }

        console.log(step)
        console.log(a, b)

    })

    return (<Scroll html>

        {/* 3 section h screen */}
        <section className="h-screen bg-blue-500">
            <h1>Section 1</h1>
        </section>

        <section className="h-screen bg-red-500">
            <h1>Section 2</h1>
        </section>
        <section className="h-screen bg-green-500">
            <h1>Section 3</h1>
        </section>


    </Scroll>)
}
