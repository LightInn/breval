import Link from 'next/link'

export default function NotFound() {
	return (
		<main className="flex h-screen w-full flex-col items-center justify-center bg-white">
			<h1 className="text-9xl font-extrabold tracking-widest text-accent">
				404
			</h1>
			<div className="absolute rotate-12 rounded bg-glow-500 px-2 text-sm">
				Page Not Found
			</div>
			<button className="mt-5">
				<Link
					className="group relative inline-block text-sm font-medium text-black focus:outline-none focus:ring active:text-orange-500"
					href={'/'}
				>
					<span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-accent transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

					<span className="relative block border border-current bg-accent px-8 py-3">
						<router-link to="/">Go Home</router-link>
					</span>
				</Link>
			</button>
		</main>
	)
}
