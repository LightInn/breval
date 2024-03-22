import Image from "next/image";
import React from "react";
import profileCharacter from "../../../public/avatar.svg";
import Avatar from "/src/components/animated/Avatar";

const AboutCoverSection = ({background = null}) => {
    return (
        <section
            className="w-full h-screen border-b-2 border-solid border-dark flex flex-col md:flex-row items-center justify-center text-dark bg-dynamic-bg bg-cover ">
            <div className="p-20 w-full h-full flex justify-center items-center backdrop-blur-lg">


                <div className="flex flex-col w-1/2 p-8  bg-pink-500">


                    <h2 className="font-bold capitalize text-4xl xs:text-5xl sxl:text-6xl  text-center lg:text-left">
                        Dream Big, Work Hard, Achieve More!
                    </h2>
                    <p className="font-medium capitalize mt-4 text-base">
                        This Mantra Drives My Work As A Passionate Freelancer. I Blend
                        Innovative Technology With Timeless Design For Captivating Digital
                        Experiences. Inspired By Nature And Literature, I&apos;m A Perpetual
                        Learner Embracing Challenges. With Each Project, I Aim To Leave A
                        Lasting Impact—One Pixel At A Time.
                    </p>


                </div>

                <Avatar/>

            </div>
        </section>
    );
};

export default AboutCoverSection;
