import Image from "next/image";
import React from "react";
import profileCharacter from "../../../public/avatar.svg";
import Avatar from "/src/components/About/Avatar";
import { SocialIcons } from "@/components/Home/Social";
import {
  GithubIcon,
  DiscordIcon,
  LinkedinIcon,
  TwitterIcon,
  EmailIcon,
} from "@/components/Icons";
import AvatarSVG from "/public/avatar.svg";
import Link from "next/link";

const AboutCoverSection = ({ background = null }) => {
  return (
    <section className="w-full h-screen border-b-2 border-solid border-dark flex flex-col md:flex-row items-center justify-center text-dark bg-dynamic-bg bg-cover ">
      <div className="p-20 w-full h-full flex justify-center items-center backdrop-blur-lg">
        <div className="flex flex-col justify-center items-center md:items-end w-full md:w-1/4 ">
          <Image
            src={AvatarSVG}
            alt="avatar of Bréval"
            width={250}
            height={250}
            className="md:hidden my-10"
          />

          <h2 className="font-bold capitalize text-white text-4xl md:text-6xl  text-center lg:text-right  md:bg-white/30 md:rounded-2xl md:p-6 md:message-bulle ">
            Hi, I&apos;m <br />
            <bold>Bréval</bold>.
          </h2>
          <p className="font-medium capitalize md:text-2xl md:text-right  md:bg-white/30 md:rounded-2xl md:p-20 md:mt-8 md:message-bulle text-white">
            I&apos;m a creative developer <br />
            from France, Loire Atlantique.
          </p>

          <div className="flex w-full h-full gap-2 mt-20 p-2 ">
            <Link
              href="https://github.com/LightInn/"
              className="w-full h-full"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Github"
              title="Github"
            >
              <GithubIcon className="w-[30px] rounded-2xl bg-dynamic-vibrant-light hover:bg-dynamic-muted-light p-2 md:message-bulle" />
              {/*<DribbbleIcon*/}
              {/*    className="w-[30px] rounded-2xl bg-dynamic-vibrant-light hover:bg-dynamic-muted-light p-2 md:message-bulle"/>*/}
            </Link>
            <Link
              href="https://www.linkedin.com/in/breval-lefloch/"
              className="w-full h-full"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Linkedin"
              title="Linkedin"
            >
              <LinkedinIcon className="w-[30px] rounded-2xl bg-dynamic-vibrant-light hover:bg-dynamic-muted-light p-2 md:message-bulle" />
            </Link>
            <Link
              href="https://twitter.com/Unknow429523025"
              className="w-full h-full"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Twitter"
              title="Twitter"
            >
              <TwitterIcon className="w-[30px] rounded-2xl bg-dynamic-vibrant-light hover:bg-dynamic-muted-light p-2 md:message-bulle" />
            </Link>
            <Link
              href="mailto:breval.lefloch@gmail.com"
              className="w-full h-full"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Email"
              title="Email"
            >
              <EmailIcon className="w-[30px] rounded-2xl bg-dynamic-vibrant-light hover:bg-dynamic-muted-light p-2 md:message-bulle" />
            </Link>
            <Link
              href="https://discordapp.com/users/232064075553701888"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Discord"
              title="Discord"
              className="w-full h-full"
            >
              <DiscordIcon className="w-[30px] rounded-2xl bg-dynamic-vibrant-light hover:bg-dynamic-muted-light p-2 md:message-bulle" />
            </Link>
            {/*Email*/}
            {/*Tel*/}
            {/*discord*/}
            {/*twitter*/}
            {/*insta*/}
          </div>

          <div className="hidden md:block">
            <SocialIcons />
          </div>
        </div>

        <Avatar />
      </div>
    </section>
  );
};

export default AboutCoverSection;
