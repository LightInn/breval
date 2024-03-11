import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="rounded-t-2xl bg-accent mt-8 flex flex-col items-center text-black z-20">
      <div className="w-full  mt-4 md:mt-8 relative font-medium border-t border-solid border-light py-2 md:py-6 px-8 flex flex-col md:flex-row items-center justify-between">
        <span className="text-center">
          &copy;2024 brev.al All rights reserved.
        </span>
        <Link
          href="/sitemap.xml"
          className="text-center underline my-4 md:my-0 hidden md:block"
        >
          sitemap.xml
        </Link>
        <div className="text-center hidden md:block">
          Made with &hearts; by{" "}
          <Link
            href="/"
            className="underline"
            target="_blank"
            aria-label="Going back to main page"
          >
            Bréval LE FLOCH
          </Link>
          ; Design by{" "}
          <a
            href="https://devdreaming.com"
            className="underline"
            target="_blank"
          >
            CodeBucks
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
