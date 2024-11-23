import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedAllProjects({ step }) {
    const [showCircle, setShowCircle] = useState(false);
    const [showProjects, setShowProjects] = useState(false);

    useEffect(() => {
        if (step === 3) {
            setShowCircle(false); // Réinitialiser l'animation si besoin
            setShowProjects(false);

            // Délai pour afficher le cercle après 1 seconde
            const circleTimeout = setTimeout(() => {
                setShowCircle(true);
            }, 1000);

            // Délai supplémentaire pour afficher les projets après le cercle
            const projectsTimeout = setTimeout(() => {
                setShowProjects(true);
            }, 2000);

            return () => {
                clearTimeout(circleTimeout);
                clearTimeout(projectsTimeout);
            };
        } else {
            setShowCircle(false);
            setShowProjects(false);
        }
    }, [step]);

    return (
        <div className="h-screen w-screen relative overflow-hidden">
            <AnimatePresence>
                {step === 3 && showCircle && (
                    <motion.div
                        className="absolute bg-black rounded-full"
                        initial={{
                            width: 0,
                            height: 0,
                            left: "50%",
                            top: "50%",
                            opacity: 1,
                        }}
                        animate={{
                            width: "200vw",
                            height: "200vw",
                            left: "-50vw",
                            top: "-50vw",
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 1.2,
                            ease: "easeInOut",
                        }}
                    />
                )}
            </AnimatePresence>

            {showProjects && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <ProjectsGrid />
                </motion.div>
            )}
        </div>
    );
}

function ProjectsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto p-8">
            {/* Exemple de projets statiques */}
            {Array.from({ length: 9 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
                >
                    Project {i + 1}
                </div>
            ))}
        </div>
    );
}
