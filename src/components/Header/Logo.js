import Image from "next/image";
import Link from "next/link";
import LogoA from "/public/logo.png";
// import profileImg from "../../../public/profile-img.png"

const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-dark">
      <div className=" w-12 md:w-16 overflow-hidden mr-2 md:mr-4">
        <Image
          src={LogoA}
          alt="CodeBucks logo"
          className="w-full h-auto rounded-full"
          sizes="20vw"
          priority
        />
      </div>
      <span className="font-bold text-lg md:text-xl">Bréval Le FLOCH</span>
    </Link>
  );
};

export default Logo;
