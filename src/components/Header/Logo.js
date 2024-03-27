import Image from "next/image";
import Link from "next/link";
import LogoA from "/public/logo.png";
import rgbDataURL from "@/services/dataurl.services";
// import profileImg from "../../../public/profile-img.png"

const Logo = () => {
  return (
    <Link
      href="/"
      className="items-center text-dark no-underline hidden xl:flex"
    >
      <div className=" w-12 md:w-16 overflow-hidden mr-2 md:mr-4">
        <Image
          src={LogoA}
          alt="Bréval Le Floch logo"
          className="w-full h-auto rounded-full"
          placeholder="blur"
          blurDataURL={rgbDataURL(231, 183, 202)}
          sizes="20vw"
          priority
        />
      </div>
      <span className="font-bold text-lg md:text-xl">Bréval Le FLOCH</span>
    </Link>
  );
};

export default Logo;
