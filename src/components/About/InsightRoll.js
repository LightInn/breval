import React from 'react'

const InsightRoll = ({ insights }) => {
	return (
		<div className="text-light w-full overflow-hidden whitespace-nowrap bg-accent">
			<div className="animate-roll flex w-full items-center justify-center py-2 text-sm font-semibold capitalize tracking-wider sm:py-3 sm:text-base">
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
