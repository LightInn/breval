import { rgbDataURL } from '@/services/dataurl.services'
import Image from 'next/image'
import Link from 'next/link'

import LogoA from '/public/logo.png'
// import profileImg from "../../../public/profile-img.png"

const Logo = () => {
	return (
		<Link
			className="text-dark hidden items-center no-underline xl:flex"
			href="/"
		>
			<div className="mr-2 w-12 overflow-hidden md:mr-4 md:w-16">
				<Image
					alt="Bréval Le Floch logo"
					blurDataURL={rgbDataURL(231, 183, 202)}
					className="h-auto w-full rounded-full"
					placeholder="blur"
					priority
					sizes="20vw"
					src={LogoA}
				/>
			</div>
			<span className="text-lg font-bold md:text-xl">Bréval Le FLOCH</span>
		</Link>
	)
}

export default Logo
