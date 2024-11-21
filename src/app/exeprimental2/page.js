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
            <AnimatedScene />
            <Preload all />
        </Canvas>
    );
}

function AnimatedScene() {
    const modelRef = useRef();
    const fadeRef = useRef();
    const [animationComplete, setAnimationComplete] = useState(false);

    useFrame((state, delta) => {
        if (modelRef.current) {
            // Animate model position and scale
            modelRef.current.position.x += delta * 5; // Move right
            modelRef.current.position.y += delta * 2; // Move up
            modelRef.current.scale.x += delta;
            modelRef.current.scale.y += delta;
            modelRef.current.scale.z += delta;

            // Detect when animation completes
            if (modelRef.current.scale.x >= 20) {
                setAnimationComplete(true);
            }
        }

        if (fadeRef.current) {
            // Fade to black after the animation
            fadeRef.current.material.opacity = THREE.MathUtils.lerp(
                fadeRef.current.material.opacity,
                animationComplete ? 1 : 0,
                delta
            );
        }
    });

    return (
        <>
            {/* Animated Model */}
            <mesh ref={modelRef}>
                <Model />
            </mesh>

            {/* Fade to black */}
            <mesh ref={fadeRef}>
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial color="black" transparent opacity={0} />
            </mesh>

            {/* HTML Content */}
            {animationComplete && (
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
