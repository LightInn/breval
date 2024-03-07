"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { DribbbleIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "../Icons";
import Link from "next/link";
import siteMetadata from "/src/utils/siteMetaData";

const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <footer className="mt-4 rounded-2xl bg-dark m-2 sm:m-10 flex flex-col items-center text-light z-20">
      <div className="w-full  mt-4 md:mt-8 relative font-medium border-t border-solid border-light py-6 px-8 flex  flex-col md:flex-row items-center justify-between">
        <span className="text-center">
          &copy;2024 brev.al All rights reserved.
        </span>
        <Link
          href="/sitemap.xml"
          className="text-center underline my-4 md:my-0"
        >
          sitemap.xml
        </Link>
        <div className="text-center">
          Made with &hearts; by{" "}
          <a href="https://brev.al" className="underline" target="_blank">
            Bréval LE FLOCH
          </a>
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
