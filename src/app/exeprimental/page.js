import React, {Suspense} from 'react'
import {ThreeScene} from "@/components/exeprimental/ThreeScene";

export default async function Project() {

    return (
        <section className="bg-white">

            <Suspense fallback={<FallbackTest/>}>
                <div className="h-screen">
                    <ThreeScene/>
                </div>
            </Suspense>


        </section>
    )
}


// fallback component is a loading skeleton screen
function FallbackTest() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-20 h-20 mb-4 bg-gray-300 rounded-full animate-bounce"/>
            <div className="w-20 h-20 bg-gray-300 rounded-full animate-bounce"/>
            Loading...
        </div>
    )
}


// async function getProject() {
// 	const res = await fetch(
// 		'https://breval-api.lightin.io/api/projets?sort=date%3Adesc&populate=*'
// 	)
// 	const data = await res.json()
//
// 	return data.data
// }
