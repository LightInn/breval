import React from 'react'

export default function Divider({ top }) {
	return (
		<section
			className={`relative z-30 flex h-[30px] translate-y-[-25px] transform snap-start items-center justify-center bg-slate-900 drop-shadow-[0px_-10px_1px_-8px_rgba(0,0,0,1)] ${
				top ? 'rounded-t-full' : 'rounded-b-full'
			}`}
		>
			{/* @ts-ignore */}

			{top ? (
				<hr className="w-[50px] border-glow-500" />
			) : (
				// bottom border thin empty arrow  divider
				<svg
					className="pb-8"
					fill="#ffc6d3"
					height="50px"
					id="Layer_1"
					version="1.1"
					viewBox="0 0 330 330"
					width="30px"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
						id="XMLID_225_"
					/>
				</svg>
			)}
		</section>
	)
}
