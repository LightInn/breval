import React from 'react';
import styles from '@/styles/Journey.module.css'; // We will create this CSS module

const Journey = () => {
    const journeyEvents = [
        {
            title: "Middle School: The Spark",
            description: "Fascination with video games led to Blender and Python at 13. Explored Linux, dual booting, and Python socket servers. Co-founded a computer club, rebuilt PCs, and delved into cybersecurity, even gaining admin access to the school network. Built a remote-controlled robot from scratch.",
            cliOutput: "$ initiation_sequence complete // circa 2010-2014"
        },
        {
            title: "High School: Deep Dive",
            description: "Explored neural networks from scratch, envisioning 3D structures for them. Continued coding, attempted a social network app, and strengthened security, systems, and network skills by setting up a home Linux server.",
            cliOutput: "$ skill_matrix_expanded // circa 2014-2017"
        },
        {
            title: "University: Mastering the Craft",
            description: "Eagerly absorbed computer science concepts, excelling in databases (PostgreSQL), Docker, Kubernetes, automated deployments, and infrastructure security. Became proficient in backend/frontend development and pipeline management.",
            cliOutput: "$ proficiency_achieved --level expert // circa 2017-2022"
        },
        {
            title: "Today: Creative Technologist & Entrepreneur",
            description: "Co-founded ForMenu, My-Makeup, Forvoyez. Passionate about front-ops (frontend & infrastructure). Enjoys touching everything, switching between skills, and coding on exciting projects or playing indie games in free time.",
            cliOutput: "$ current_status active --mode creative // 2022-PRESENT"
        }
    ];

    return (
        <section id="journey" className={styles.journeySection}>
            <h2 className={styles.journeyTitle}>MY JOURNEY</h2>
            <div className={styles.timeline}>
                {journeyEvents.map((event, index) => (
                    <div key={index} className={`${styles.timelineEvent} ${index % 2 === 0 ? styles.timelineEventEven : styles.timelineEventOdd}`}>
                        <div className={styles.timelineVisualPlaceholder}>
                            {/* Placeholder for SVG/3D Scene */}
                        </div>
                        <div className={styles.timelineContent}>
                            <h4>{event.title}</h4>
                            <p>{event.description}</p>
                            {event.cliOutput && (
                                <div className={styles.timelineCliOutput}>
                                    {event.cliOutput}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Journey;
