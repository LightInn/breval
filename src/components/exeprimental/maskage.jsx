"use client"
import {useTexture} from "@react-three/drei";
import {Model} from "@/components/exeprimental/Crow_fly";
import {useRef} from "react";

export function Scene() {
    const projectTexture = useTexture('/placeholder.svg'); // Texture de projet

    return (
        <>
            {/* Contexte du contenu à masquer */}
            <BackgroundContent texture={projectTexture} />

            {/* Modèle du corbeau avec masque */}
            <MaskedCrow />
        </>
    );
}

function BackgroundContent({ texture }) {
    return (
        <mesh position={[0, 0, -1]}>
            <planeGeometry args={[5, 5]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    );
}

function MaskedCrow() {
    const maskRef = useRef();

    return (
        <group>
            <Model />
            {/* Ajout d'un masque à chaque plume */}
            <mesh ref={maskRef} position={[1, 0, 0]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="black" />
            </mesh>
        </group>
    );
}