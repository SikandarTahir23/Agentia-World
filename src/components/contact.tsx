"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { BASE_URL } from "@/api/base-url";


export function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage("");

        try {
            const response = await fetch(`${BASE_URL}/api/v5/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formState.name,
                    email: formState.email,
                    subject: formState.subject,
                    message: formState.message,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setResponseMessage("Your message has been sent successfully!");
                setFormState({ name: "", email: "", subject: "", message: "" });
            } else {
                setResponseMessage(result.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.log(error);
            setResponseMessage("Failed to send message. Please check your internet connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 md:px-24 relative bg-black overflow-hidden md:bg-gradient-to-t md:from-purple-900/20 md:to-black">
            {/* Particle effects */}
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-500 rounded-full"
                        animate={{
                            x: ["0%", "100%", "0%"],
                            y: ["0%", "100%", "0%"],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        Get in Touch
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Have questions? We&apos;re here to help you get started with your AI journey.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="flex items-start gap-4">
                            <Mail className="w-6 h-6 text-cyan-500 mt-1" />
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-white">Email Us</h3>
                                <p className="text-gray-400">Our friendly team is here to help.</p>
                                <a href="mailto:umarofficial0121@gmail.com" className="text-cyan-500 hover:text-cyan-400 transition-colors">
                                  sikandar.tahir.04@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MessageSquare className="w-6 h-6 text-cyan-500 mt-1" />
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-white">Live Chat</h3>
                                <p className="text-gray-400">Available 24/7 for enterprise customers.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="w-6 h-6 text-cyan-500 mt-1" />
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-white">Phone</h3>
                                <p className="text-gray-400">Mon-Fri from 8am to 5pm.</p>
                                <a href="tel:+923172472531" className="text-cyan-500 hover:text-cyan-400 transition-colors">
                                    +92 312 3456789
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl opacity-20 blur" />
                        <div className="relative bg-black rounded-xl p-8 border border-white/10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative">
                                    <Input
                                        name="name"
                                        value={formState.name}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-transparent border-cyan-500/50 focus:border-cyan-500 text-white py-8"
                                    />
                                    <label className={`absolute left-4 transition-all duration-300 ${formState.name ? "text-xs top-2 text-cyan-500" : "top-1/2 -translate-y-1/2"}`}>
                                        Your Name
                                    </label>
                                </div>

                                <div className="relative">
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formState.email}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-transparent border-cyan-500/50 focus:border-cyan-500 text-white py-8"
                                    />
                                    <label className={`absolute left-4 transition-all duration-300 ${formState.email ? "text-xs top-2 text-cyan-500" : "top-1/2 -translate-y-1/2"}`}>
                                        Your Email
                                    </label>
                                </div>

                                <div className="relative">
                                    <Input
                                        name="subject"
                                        value={formState.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-transparent border-cyan-500/50 focus:border-cyan-500 text-white py-8"
                                    />
                                    <label className={`absolute left-4 transition-all duration-300 ${formState.subject ? "text-xs top-2 text-cyan-500" : "top-1/2 -translate-y-1/2"}`}>
                                        Subject
                                    </label>
                                </div>

                                <div className="relative">
                                    <Textarea
                                        name="message"
                                        value={formState.message}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-transparent border-cyan-500/50 focus:border-cyan-500 text-white min-h-[120px] py-6"
                                    />
                                    <label className={`absolute left-4 transition-all duration-300 ${formState.message ? "text-xs top-2 text-cyan-500" : "top-6"}`}>
                                        Your Message
                                    </label>
                                </div>

                                <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-500 to-purple-600">
                                    {loading ? "Sending..." : "Send Message"}
                                </Button>

                                {responseMessage && <p className="text-center text-cyan-400">{responseMessage}</p>}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
