import "@/styles/styule.css"
import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


// Liste des projets (à remplacer par vos vrais projets)
const projects = [
    {
        id: '1',
        name: 'Projet Sakura',
        description: 'Une application de suivi de la floraison des cerisiers',
        imageUrl: '/dynamic/0.webp',
        link: '/projects/sakura'
    },
    {
        id: '2',
        name: 'Tokyo Nights',
        description: 'Un jeu vidéo d\'aventure nocturne à Tokyo',
        imageUrl: '/dynamic/1.webp',
        link: '/projects/tokyo-nights'
    },
    {
        id: '3',
        name: 'Sushi Master',
        description: 'Une plateforme d\'apprentissage pour devenir maître sushi',
        imageUrl: '/dynamic/2.webp',
        link: '/projects/sushi-master'
    },
    {
        id: '4',
        name: 'Zen Garden',
        description: 'Une application de méditation inspirée des jardins japonais',
        imageUrl: '/dynamic/3.webp',
        link: '/projects/zen-garden'
    },
    {
        id: '5',
        name: 'Kanji Quest',
        description: 'Un jeu éducatif pour apprendre les kanjis',
        imageUrl: '/dynamic/4.webp',
        link: '/projects/kanji-quest'
    },
    // Ajoutez d'autres projets ici
];


const CardHover = {
    rest: {opacity: 0, y: 20, ease: "easeOut", duration: 0.2, type: "tween"},
    hover: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            type: "tween",
            ease: "easeIn",
        },
    },
};

const AnimatedAllProjects = ({step}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showProjects, setShowProjects] = useState(false);

    useEffect(() => {
        console.log(step, isVisible, showProjects)
        if (step === 3) {
            setTimeout(() => {
                setIsVisible(true);
                setTimeout(() => {
                    setShowProjects(true);
                }, 800); // Durée de l'animation de l'effet d'encre
            }, 1000); // Délai avant le démarrage de l'animation
        } else {
            setIsVisible(false);
            setShowProjects(false);
        }
    }, [step]);

    return (
        <div className="relative w-screen h-screen overflow-scroll">
            {/* Section d'animation locale */}

            {/* Animation d'encre */}
            {isVisible && (

                <div className="bg-layer absolute left-0 top-0 w-full h-full bg-red-200 "></div>


            )}

            {showProjects && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.8}}
                    className="absolute inset-0 flex items-center justify-center t-lauyer "
                >
                </motion.div>
            )}


            {showProjects && (
                <div className="px-8 t-lauyer text-[#e4dcca]">
                    <motion.h1
                        initial={{opacity: 0, y: -50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        className="text-4xl font-bold text-pink-200 text-center mb-12 z-50"
                    >
                        Mes Projets
                    </motion.h1>

                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.8, delay: 0.2}}
                        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
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
                                        <h2 className="text-xl font-bold text-white">{project.name}</h2>
                                        <div

                                            className="description text-white text-sm opacity-0 translate-y-[20px] transition-all duration-300"
                                        >
                                            {project.description}
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>

                </div>

            )}


        </div>

    );
};

export default AnimatedAllProjects;
