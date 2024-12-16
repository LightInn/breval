import React, { Suspense } from 'react'
import { ThreeScene } from '@/components/projects/ThreeScene'
import Navbar from '@/components/navbar'

export default async function Project() {
	return (
		<section className="bg-white">
			<Navbar />

			<Suspense fallback={<FallbackTest />}>
				<div className="h-screen">
					<ThreeScene />
				</div>
			</Suspense>
		</section>
	)
}

// fallback component is a loading skeleton screen
function FallbackTest() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<div className="bg-gray-300 mb-4 h-20 w-20 animate-bounce rounded-full" />
			<div className="bg-gray-300 h-20 w-20 animate-bounce rounded-full" />
			Loading...
		</div>
	)
}
