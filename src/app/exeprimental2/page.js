"use client";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Preload } from "@react-three/drei";
import React, { useRef, useState } from "react";
import { FlyingCrow } from "@/components/exeprimental/Crow_fly";
import AnimatedAllProjects from "@/components/exeprimental/AnimatedAllProjects";

export default function App() {
    return (
        <section className="h-screen w-screen relative ">
            <AnimatedAllProjects step={3}/>
        </section>
    );
}
