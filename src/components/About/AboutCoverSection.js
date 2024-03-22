import Image from "next/image";
import React from "react";
import profileCharacter from "../../../public/avatar.svg";
import Avatar from "/src/components/About/Avatar";
import {SocialIcons} from "@/components/Home/Social";
import {GithubIcon,DribbbleIcon,MoonIcon,SunIcon,LinkedinIcon,TwitterIcon} from "@/components/Icons";
import AvatarSVG from "/public/avatar.svg";

const AboutCoverSection = ({background = null}) => {
    return (
        <section
            className="w-full h-screen border-b-2 border-solid border-dark flex flex-col md:flex-row items-center justify-center text-dark bg-dynamic-bg bg-cover ">
            <div className="p-20 w-full h-full flex justify-center items-center backdrop-blur-lg">


                <div className="flex flex-col justify-center items-center md:items-end w-full md:w-1/4 ">

                    <Image src={AvatarSVG} alt="avatar of Bréval" width={250} height={250} className="md:hidden my-10" />

                    <h2 className="font-bold capitalize text-white text-4xl md:text-6xl  text-center lg:text-right  md:bg-white/30 md:rounded-2xl md:p-6 md:message-bulle ">
                        Hi, I&apos;m <br/>
                        <bold>Bréval</bold>
                        .
                    </h2>
                    <p className="font-medium capitalize md:text-2xl md:text-right  md:bg-white/30 md:rounded-2xl md:p-20 md:mt-8 md:message-bulle text-white">
                        I&apos;m a creative developer <br/>
                        from France, Loire Atlantique.
                    </p>


                    <div className="bg-red-500 w-full h-full mt-20 rounded-2xl p-8 hidden">
                        <GithubIcon className="w-[30px]"/>
                        <DribbbleIcon className="w-[30px]"/>
                        <MoonIcon className="w-[30px]"/>
                        <SunIcon className="w-[30px]"/>
                        <LinkedinIcon className="w-[30px]"/>
                        <TwitterIcon className="w-[30px]"/>

                    </div>

                </div>

                <Avatar/>

            </div>
        </section>
    );
};

export default AboutCoverSection;
