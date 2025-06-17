import React from 'react'

import Image from 'next/image'

export function Playground({
	image = '/dynamic/0.webp',
	setReload = null,
	data = {},
}) {
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center space-y-12 px-8 py-4 md:ml-20">
			<div
				className="rounded-lg p-4 text-center shadow-xl"
				style={{ background: data.lightVibrant }}
			>
				<h1 className="text-lg font-bold text-gray-800">
					Everything looks oddly colored here, doesn&apos;t it?
				</h1>
				<p>Well, that&apos;s because I didn&apos;t choose the colors!</p>
				<p>
					The color theme is generated dynamically from the background image ⭐
				</p>
				<p>You can reload the page to try with a different image and theme!</p>
			</div>

			<div className="p-4">
				<p className="text-xl font-semibold text-black">Actual Theme</p>

				<div className="flex flex-col items-center justify-center gap-2 md:flex-row">
					<div className="grid w-[25vw] min-w-80 grid-cols-3 gap-4">
						<div
							className="flex aspect-square w-full max-w-48 transform items-center justify-center rounded-lg text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-110"
							style={{ background: data.lightVibrant }}
						>
							Vibrant Light
						</div>
						<div
							className="flex aspect-square w-full max-w-48 transform items-center justify-center rounded-lg text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-110"
							style={{ background: data.vibrant }}
						>
							Vibrant
						</div>
						<div
							className="flex aspect-square w-full max-w-48 transform items-center justify-center rounded-lg text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-110"
							style={{ background: data.darkVibrant }}
						>
							Vibrant Dark
						</div>
						<div
							className="flex aspect-square w-full max-w-48 transform items-center justify-center rounded-lg text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-110"
							style={{ background: data.lightMuted }}
						>
							Muted Light
						</div>
						<div
							className="flex aspect-square w-full max-w-48 transform items-center justify-center rounded-lg text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-110"
							style={{ background: data.muted }}
						>
							Muted
						</div>
						<div
							className="flex aspect-square w-full max-w-48 transform items-center justify-center rounded-lg text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-110"
							style={{ background: data.darkMuted }}
						>
							Muted Dark
						</div>
					</div>

					<p className="text-xl font-semibold text-black md:hidden">
						Based on Image
					</p>
					<Image
						alt="image of a landscape to generate the theme"
						className="rounded-2xl md:mx-10 md:w-1/2"
						height={1080 / 3}
						src={image}
						width={1920 / 3}
					/>
				</div>
			</div>

			<button
				className="hover:bg-dynamic-vibrant-dark mt-5 rounded-full px-6 py-3 font-bold shadow-lg transition-colors duration-300 ease-in-out hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
				data-umami-event="reload"
				onClick={() => setReload(Math.random())}
				style={{ background: data.vibrant }}
			>
				Reload Page
			</button>
		</div>
	)
}
