import Image from 'next/image'
import LocalizedText from '@/components/Global/localized-text'
export function Playground({ image = '/dynamic/0.webp', setReload = null, data = {} }) {
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center space-y-12 px-8 py-4 md:ml-20">
			<div
				className="rounded-lg p-4 text-center shadow-xl"
				style={{
					background: data.lightVibrant,
				}}
			>
				<h1 className="text-lg font-bold text-gray-800">
					<LocalizedText id="paletteTitle" />
				</h1>
				<p>
					<LocalizedText id="paletteIntro" />
				</p>
				<p>
					<LocalizedText id="paletteDescription" />
				</p>
				<p>
					<LocalizedText id="paletteReload" />
				</p>
			</div>

			<div className="p-4">
				<p className="text-xl font-semibold text-black">
					<LocalizedText id="currentTheme" />
				</p>

				<div className="flex flex-col items-center justify-center gap-2 md:flex-row">
					<div className="grid w-[25vw] min-w-80 grid-cols-3 gap-4">
						<div
							className="flex aspect-square w-full max-w-48 transform items-center justify-center rounded-lg text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-110"
							style={{
								background: data.lightVibrant,
							}}
						>
							<LocalizedText id="vibrantLight" />
						</div>
						<div
							className="flex aspect-square w-full max-w-48 transform items-center justify-center rounded-lg text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-110"
							style={{
								background: data.vibrant,
							}}
						>
							<LocalizedText id="vibrant" />
						</div>
						<div
							className="flex aspect-square w-full max-w-48 transform items-center justify-center rounded-lg text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-110"
							style={{
								background: data.darkVibrant,
							}}
						>
							<LocalizedText id="vibrantDark" />
						</div>
						<div
							className="flex aspect-square w-full max-w-48 transform items-center justify-center rounded-lg text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-110"
							style={{
								background: data.lightMuted,
							}}
						>
							<LocalizedText id="mutedLight" />
						</div>
						<div
							className="flex aspect-square w-full max-w-48 transform items-center justify-center rounded-lg text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-110"
							style={{
								background: data.muted,
							}}
						>
							<LocalizedText id="muted" />
						</div>
						<div
							className="flex aspect-square w-full max-w-48 transform items-center justify-center rounded-lg text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-110"
							style={{
								background: data.darkMuted,
							}}
						>
							<LocalizedText id="mutedDark" />
						</div>
					</div>

					<p className="text-xl font-semibold text-black md:hidden">
						<LocalizedText id="basedOnImage" />
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
				style={{
					background: data.vibrant,
				}}
				type="button"
			>
				<LocalizedText id="reloadPage" />
			</button>
		</div>
	)
}
