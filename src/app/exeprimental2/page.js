"use client";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Preload } from "@react-three/drei";
import { useRef, useState } from "react";
import { Model } from "@/components/exeprimental/Crow_fly";

export default function App() {
    return (
        <Canvas camera={{ fov: 75, position: [0, 0, 10] }} style={{ height: "100vh" }}>
            <color attach="background" args={["#1e293b"]} />
            <ambientLight intensity={0.5} />
            <AnimationSequence />
            <Preload all />
        </Canvas>
    );
}

function AnimationSequence() {
    const modelRef = useRef();
    const fadeRef = useRef();
    const [animationStage, setAnimationStage] = useState(0); // 0 = moving, 1 = fading, 2 = finished
    const [elapsedTime, setElapsedTime] = useState(0);

    const startPosition = new THREE.Vector3(-5, -3, 0);
    const endPosition = new THREE.Vector3(0, 0, 0);
    const startRotation = new THREE.Euler(0, Math.PI / 4, 0);
    const endRotation = new THREE.Euler(Math.PI / 2, 0, Math.PI / 6);

    const animationDuration = 1; // Time in seconds for the transition

    useFrame((state, delta) => {
        if (animationStage === 0 && modelRef.current) {
            // Update elapsed time
            const newElapsedTime = elapsedTime + delta;
            setElapsedTime(newElapsedTime);

            // Calculate interpolation factor (0 to 1)
            const t = Math.min(newElapsedTime / animationDuration, 1);

            // Interpolate position and rotation
            modelRef.current.position.lerpVectors(startPosition, endPosition, t);
            modelRef.current.rotation.x = THREE.MathUtils.lerp(startRotation.x, endRotation.x, t);
            modelRef.current.rotation.y = THREE.MathUtils.lerp(startRotation.y, endRotation.y, t);
            modelRef.current.rotation.z = THREE.MathUtils.lerp(startRotation.z, endRotation.z, t);

            // Transition to next stage
            if (t >= 1) {
                setAnimationStage(1);
            }
        }

        if (animationStage === 1 && fadeRef.current) {
            // Fade to black
            fadeRef.current.material.opacity = THREE.MathUtils.lerp(
                fadeRef.current.material.opacity,
                1,
                delta
            );

            // Complete fade
            if (fadeRef.current.material.opacity >= 0.99) {
                setAnimationStage(2);
            }
        }
    });

    return (
        <>
            {/* Animated Model */}
            <mesh ref={modelRef} position={startPosition} rotation={startRotation}>
                <Model />
            </mesh>

            {/* Fade to black */}
            <mesh ref={fadeRef}>
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial color="black" transparent opacity={0} />
            </mesh>

            {/* HTML Content */}
            {animationStage === 2 && (
                <Html fullscreen>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100vh",
                            background: "rgba(0,0,0,0.8)",
                            color: "white",
                            textAlign: "center",
                        }}
                    >
                        <div>
                            <h1>Bienvenue</h1>
                            <p>Le voyage commence ici.</p>
                            <button
                                style={{
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "5px",
                                    background: "#f97316",
                                    color: "white",
                                    cursor: "pointer",
                                }}
                                onClick={() => alert("Exploration commencée !")}
                            >
                                Découvrir
                            </button>
                        </div>
                    </div>
                </Html>
            )}
        </>
    );
}
