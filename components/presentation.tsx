import Image from "next/image";
import React from "react";

export function Presentation() {
    return <section
        className="relative z-30 box-border flex min-h-[100vh] w-full -translate-y-[25px]
			transform flex-col flex-wrap items-center justify-center
			bg-slate-900 px-4 text-sky-900 2xl:px-0"
    >
        <div className={"mx-auto h-full max-w-7xl"}>
            <div
                className={
                    "w-full lg:flex lg:h-full lg:items-center lg:justify-center"
                }
            >
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                    <div className="lg:pl-20">
                        <div className="flex max-w-xs px-2.5 lg:max-w-none">
                            <div
                                className={
                                    "w-auto rotate-2 rounded-2xl bg-glow-500/30 p-10 shadow-2xl"
                                }
                            >
                                <Image
                                    src={"/breval.png"}
                                    alt="Breval Le Floch Avatar"
                                    width={250}
                                    height={250}
                                    className="aspect-square object-cover object-center"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex h-full flex-col items-start justify-center lg:order-first lg:row-span-2">
                        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                            {`Bonjour, je m'appelle `}
                            <span className="text-green-600">
										Bréval&nbsp;Le&nbsp;Floch
									</span>
                        </h1>
                        <div className="mt-6 space-y-7 text-base text-slate-300">
                            <p>
                                {`
											→ CTO de la start-up ForMenu, 
										`}
                                <br/>
                                {`
											→ Co-fondateur de la plateforme de mise en relation entre particuliers et maquilleuses professionnelles My-Makeup,
										`}
                                <br/>
                                {`
											→ Co-fondateur de la plateforme e-commerce Artriste.cc,
										`}
                                <br/>
                                {`
											→ Co-fondateur du groupe d'entrepreneurs ForHives,
										`}
                            </p>
                            <p>
                                {`
										Je suis un étudiant en alternance qui habite à Nantes. Dès mon plus
										jeune âge, j'ai été fasciné par les possibilités infinies des
										ordinateurs et des nouvelles technologies.
										`}
                            </p>
                            <p>
                                {`
										Alors que je continue
										d'apprendre et d'explorer cet univers en constant évolution, je suis
										motivé par ma passion de découvrir de nouveaux mondes et leurs
										nouvelles règles et mes rêves.
										`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}