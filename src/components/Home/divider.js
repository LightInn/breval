import React from 'react'

export default function Divider({ top }) {
	return (
		<section
			className={`relative z-30 flex h-[50px] -translate-y-[50px] transform snap-start items-center justify-center bg-light ${
				top ? 'rounded-t-full' : 'rounded-b-full'
			}`}
		>
			{top ? (
				// fleche haut fade-in (optionnel)
				<svg
					className="animate-fade-in-up"
					fill="none"
					height="30"
					viewBox="0 0 24 24"
					width="30"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M19 15L12 8L5 15"
						stroke="#ff71a0"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
					/>
				</svg>
			) : (
				// fleche bas loop hypnotique
				<div className="relative h-[40px]">
					<span className="absolute left-1/2 top-0 -translate-x-1/2 animate-scroll-down opacity-60">
						<svg
							fill="none"
							height="24"
							viewBox="0 0 24 24"
							width="24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5 9L12 16L19 9"
								stroke="#ffc6d3"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							/>
						</svg>
					</span>
				</div>
			)}
		</section>
	)
}
