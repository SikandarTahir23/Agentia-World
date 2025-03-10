"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

const services = [
    {
        title: "Agentic AI Education",
        description:
            "Empower yourself with comprehensive courses on agent-based AI, transforming your skills for the future.",
        stats: ["99.9% Accuracy", "24/7 Operation", "1ms Response Time"],
        color: "#00ffff",
    },
    {
        title: "AI Agent Marketplace",
        description: "Access a diverse range of AI agents and Multi-Agent Control Protocol (MCP) servers tailored to various applications.",
        stats: ["1000+ Qubits", "Quantum Supremacy", "Error Correction"],
        color: "#bf00ff",
    },
    {
        title: "Agentic Startup Incubation",
        description: "Launch your AI-driven startup with our support, from concept to deployment.",
        stats: ["Adaptive Learning", "Self-Optimization", "Real-time Training"],
        color: "#00ff00",
    },
    {
        title: "Edge AI Implementation",
        description: "Deploying intelligent systems at the edge for faster, more efficient processing",
        stats: ["Global Edge Network", "5G Integration", "Local Processing"],
        color: "#ff00ff",
    },
];

function FloatingShape({ color }: { color: string }) {
    return (
        <Float speed={1.2} rotationIntensity={1.2} floatIntensity={1.5}> {/* ✅ Lowered float/rotation intensity */}
            <mesh scale={[1.3, 1.3, 1.3]}> {/* ✅ Reduced scale for performance */}
                <octahedronGeometry args={[1, 0]} />
                <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.4} wireframe distort={0.2} speed={1.5} /> {/* ✅ Reduced distortion */}
            </mesh>
        </Float>
    );
}

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
            whileHover={{ scale: 1.03 }} // ✅ Lowered for smoother interaction
        >
            <div className="absolute inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-80 transition-all duration-500 blur-sm" /> {/* ✅ Reduced blur */}

            <div className="relative p-8 bg-black rounded-xl border border-white/10">
                <div className="h-44 mb-6"> {/* ✅ Reduced canvas height */}
                    <Canvas camera={{ position: [0, 0, 4.5] }}> {/* ✅ Adjusted camera position for performance */}
                        <ambientLight intensity={0.4} /> {/* ✅ Lowered ambient light */}
                        <pointLight position={[5, 5, 5]} />
                        <FloatingShape color={service.color} />
                    </Canvas>
                </div>

                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                    {service.title}
                </h3>

                <p className="text-gray-400 mb-6">{service.description}</p>

                <div className="grid grid-cols-3 gap-4">
                    {service.stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-sm text-cyan-400 font-mono">{stat}</div>
                        </motion.div>
                    ))}
                </div>

                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <motion.rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="none"
                        stroke="url(#service-gradient)"
                        strokeWidth="2"
                        strokeDasharray="8 8"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: 50 }}
                        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <defs>
                        <linearGradient id="service-gradient" x1="0" y1="0" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00ffff" />
                            <stop offset="100%" stopColor="#bf00ff" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </motion.div>
    );
}

export function Services() {
    return (
        <section className="py-24 relative overflow-hidden bg-black md:bg-transparent">
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
                        Our Services
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Empowering the future with cutting-edge AI solutions
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
