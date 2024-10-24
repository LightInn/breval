import React from 'react'

const InsightRoll = ({ insights }) => {
	return (
		<div className="w-full overflow-hidden whitespace-nowrap bg-accent text-light">
			<div className="flex w-full animate-roll items-center justify-center py-2 text-sm font-semibold capitalize tracking-wider sm:py-3 sm:text-base">
				{insights.map(text => (
					<div key={insights.indexOf(text)}>
						{text} <span className="px-4">|</span>{' '}
					</div>
				))}
			</div>
		</div>
	)
}

export default InsightRoll
