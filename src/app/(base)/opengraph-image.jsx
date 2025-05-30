import { ImageResponse } from 'next/og'

export const size = {
	width: 1200,
	height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
					justifyContent: 'center',
					flexDirection: 'column',
					alignItems: 'center',
					display: 'flex',
					height: '100%',
					color: 'white',
					width: '100%',
					fontSize: 48,
					padding: 32,
				}}
			>
				<div
					style={{
						alignItems: 'center',
						marginBottom: 24,
						display: 'flex',
					}}
				>
					<svg
						fill="none"
						height="64"
						viewBox="0 0 32 32"
						width="64"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect
							height="24"
							rx="2"
							stroke="#FF69B4"
							strokeWidth="2"
							width="24"
							x="4"
							y="4"
						/>
						<path d="M16 8L24 16L16 24L8 16L16 8Z" fill="#FF69B4" />
					</svg>
					<div style={{ fontWeight: 'bold', marginLeft: 16 }}>
						Bréval Le Floch
					</div>
				</div>
				<div style={{ marginBottom: 32, fontSize: 24, opacity: 0.8 }}>
					Creative Developer & Digital Craftsman
				</div>
				<div
					style={{
						display: 'flex',
						marginTop: 16,
						gap: 16,
					}}
				>
					<div
						style={{
							border: '1px solid rgba(255, 105, 180, 0.3)',
							background: 'rgba(255, 105, 180, 0.2)',
							padding: '8px 16px',
							borderRadius: 8,
						}}
					>
						Projects
					</div>
					<div
						style={{
							border: '1px solid rgba(255, 105, 180, 0.3)',
							background: 'rgba(255, 105, 180, 0.2)',
							padding: '8px 16px',
							borderRadius: 8,
						}}
					>
						Journey
					</div>
					<div
						style={{
							border: '1px solid rgba(255, 105, 180, 0.3)',
							background: 'rgba(255, 105, 180, 0.2)',
							padding: '8px 16px',
							borderRadius: 8,
						}}
					>
						About
					</div>
				</div>
			</div>
		),
		{ ...size }
	)
}
