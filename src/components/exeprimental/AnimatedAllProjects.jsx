import "@/styles/styule.css";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";



const fetchProjects = async () => {
    const res = await fetch(
        "https://breval-api.lightin.io/api/projets?sort=date%3Adesc&populate=*"
    );
    const data = await res.json();
    return data.data.map((project) => ({
        id: project.id,
        name: project.attributes.title,
        description: project.attributes.short_description,
        imageUrl: project.attributes.media?.data?.[0]?.attributes?.url || "/placeholder.jpg",
        link: `/projects/${project.attributes.title}`,
    }));
};

const AnimatedAllProjects = ({ step }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showProjects, setShowProjects] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (step === 3) {
            setTimeout(() => {
                setIsVisible(true);
                setTimeout(() => {
                    setShowProjects(true);
                }, 1000);
            }, 10);
        } else {
            setIsVisible(false);
            setShowProjects(false);
        }
    }, [step]);

    useEffect(() => {
        const loadProjects = async () => {
            const data = await fetchProjects();
            setProjects(data);
        };
        loadProjects();
    }, []);

    return (
        <div className="relative w-screen h-screen overflow-scroll">
            {isVisible  &&  (
                <div className="bg-layer absolute left-0 top-0 w-full h-full bg-red-200"></div>
            )}

            {showProjects && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.8}}
                    className=" w-screen  t-lauyer text-[#e4dcca] flex flex-col justify-center items-center"
                >


                    <h2 className="mt-24 p-4">
                        Take a look at what I've done before
                    </h2>





                    <div className="min-h-screen p-8">
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.8, delay: 0.8}}
                            className="min-h-screen columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
                        >

                            {projects.map((project) => (
                                <Link href={project.link} key={project.id}>
                                    <motion.div
                                        whileHover={{scale: 1.05}}
                                        className="relative overflow-hidden rounded-lg shadow-lg mb-4 cursor-pointer transform transition duration-300 ease-in-out group"
                                    >
                                        <Image
                                            src={project.imageUrl}
                                            alt={project.name}
                                            width={400}
                                            height={300}
                                            className="w-full h-auto object-cover transition-all duration-300 group-hover:blur-sm group-hover:opacity-60"
                                        />
                                        <div
                                            className="absolute inset-0 p-4 flex flex-col justify-between bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300">
                                            <h2 className="text-xl font-bold text-white">
                                                {project.name}
                                            </h2>
                                            <div
                                                className="description text-white text-sm opacity-0 translate-y-[20px] transition-all duration-300">
                                                {project.description}
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </motion.div>
                    </div>

                </motion.div>
            )}


        </div>
    );
};

export default AnimatedAllProjects;
