"use client";

import { motion } from "framer-motion";
import { useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshWobbleMaterial } from "@react-three/drei";

const showcaseItems = [
    {
        title: "Agentia World Platform",
        description: "A comprehensive environment where AI agents operate and interact, demonstrating real-world applications.",
        stats: { accuracy: 99.9, speed: 0.001, nodes: 1000000 },
        color: "#00ffff",
        shape: "Torus",
    },
    {
        title: "Panaversity Learning Hub",
        description: "An educational platform utilizing agentic AI to provide personalized learning experiences.",
        stats: { qubits: 1024, coherence: 100, fidelity: 99.99 },
        color: "#ff00ff",
        shape: "Icosahedron",
    },
    {
        title: "MCP Server Network",
        description: "A robust infrastructure supporting the deployment and management of multiple AI agents across various sectors.",
        stats: { nodes: 500, latency: 1, uptime: 99.999 },
        color: "#00ff00",
        shape: "Octahedron",
    },
];

function AnimatedShape({ color, shape }: { color: string; shape: string }) {
    return (
        <Float speed={0.8} rotationIntensity={1.2} floatIntensity={1.2}>
            <mesh>
                {shape === "Torus" && <torusGeometry args={[1, 0.4, 16, 100]} />}
                {shape === "Icosahedron" && <icosahedronGeometry args={[1, 0]} />}
                {shape === "Octahedron" && <octahedronGeometry args={[1, 0]} />}
                <MeshWobbleMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.3}
                    factor={0.5}
                    speed={0.8}
                />
            </mesh>
        </Float>
    );
}

function ShowcaseCard({ item, index }: { item: (typeof showcaseItems)[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const memoizedStats = useMemo(() => Object.entries(item.stats), [item.stats]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
            whileHover={{ scale: 1.03 }}
        >
            <div className="absolute inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-80 transition-all duration-500 blur-sm" />

            <div className="relative p-8 bg-black rounded-xl border border-white/10">
                <div className="h-48 mb-6">
                    <Canvas camera={{ position: [0, 0, 4] }}>
                        <ambientLight intensity={0.4} />
                        <pointLight position={[5, 5, 5]} />
                        <AnimatedShape color={item.color} shape={item.shape} />
                    </Canvas>
                </div>

                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                    {item.title}
                </h3>

                <p className="text-gray-400 mb-6">{item.description}</p>

                <div className="grid grid-cols-3 gap-4">
                    {memoizedStats.map(([key, value], i) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-2xl font-bold text-cyan-400">
                                {typeof value === "number" ? value.toLocaleString() : value}
                            </div>
                            <div className="text-sm text-gray-500 capitalize">{key}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="absolute top-0 left-0 w-8 h-8"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                >
                    <svg viewBox="0 0 32 32" className="w-full h-full">
                        <motion.path
                            d="M0 32L32 32L32 0"
                            fill="none"
                            stroke={item.color}
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                        />
                    </svg>
                </motion.div>
            </div>
        </motion.div>
    );
}

export function Showcase() {
    return (
        <section className="py-24 relative overflow-hidden bg-black">
            <div className="hidden md:block absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-purple-900/20 to-black" />
            </div>
            <div className="container mx-auto px-4 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                        Technology Showcase
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">Experience our cutting-edge AI technology in action</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {showcaseItems.map((item, index) => (
                        <ShowcaseCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
