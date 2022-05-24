import React, {useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import {useGLTF} from "@react-three/drei";

export function Me(props: any) {
    const mesh = useRef(null)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    useFrame((state, delta) => {
        // @ts-ignore
        mesh.current.rotation.y += 0.05 * delta;
    })

    const {nodes, materials} = useGLTF("/suzanne.gltf");

    return (
        <mesh
            ref={mesh}
            {...props}
            dispose={null}
            castShadow
            receiveShadow
            // @ts-ignore
            geometry={nodes.Suzanne.geometry}
            // @ts-ignore
            material={nodes.Suzanne.material}
            position={[0, 0.19, -0.04]}
        />
    );
}

useGLTF.preload("/suzanne.gltf");
