"use client"

import {Scroll, useScroll} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";

export function Overlay() {

 const   data = useScroll()


    useFrame(() => {
        // data.offset = current scroll position, between 0 and 1, dampened
        // data.delta = current delta, between 0 and 1, dampened

        // Will be 0 when the scrollbar is at the starting position,
        // then increase to 1 until 1 / 3 of the scroll distance is reached
        const a = data.range(0, 1 / 2)
        // Will start increasing when 1 / 3 of the scroll distance is reached,
        // and reach 1 when it reaches 2 / 3rds.
        const b = data.range(1 / 2, 1 / 2)


        // Same as above but with a margin of 0.1 on both ends
        const c = data.range(1 / 2, 1 / 2, 0.1)



        // Will move between 0-1-0 for the selected range
        const d = data.curve(1 / 2, 1 / 2)
        // Same as above, but with a margin of 0.1 on both ends
        const e = data.curve(1 / 3, 1 / 3, 0.1)



        // Returns true if the offset is in range and false if it isn't
        const f = data.visible(1 / 2, 1 / 2)
        // The visible function can also receive a margin
        const g = data.visible(2 / 3, 1 / 3, 0.1)

        console.log( a,d,f)

    })

    return (
        <Scroll html>

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


        </Scroll>
    )
}
