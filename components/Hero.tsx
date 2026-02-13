"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import RadioVisualizer from "@/components/RadioVisualizer";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Parallax effect for the text
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Play Overlay Voice Note on Mount
    useEffect(() => {
        const audio = new Audio("/ameen-intro.wav?v=" + Date.now());
        audio.volume = 1.0; // Ensure it's audible over background music

        const playAudio = async () => {
            try {
                await audio.play();
                console.log("Overlay voice note playing");
            } catch (err) {
                console.error("Overlay voice note play failed (interaction required?):", err);
            }
        };

        playAudio();

        // Cleanup: Fade out or stop? User said "PLAY IMMEDIATELY", didn't imply looking at it forever.
        // It's a voice note, so let it finish. 
        // But if component unmounts (nav away), silence it.
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
        >
            {/* --- CINEMATIC BACKGROUND (Dark Spotlight) --- */}
            <div className="absolute inset-0 z-0 bg-[#0a0a0a]">

                {/* 1. The Spotlight (Top Center) */}
                <div
                    className="absolute inset-0 opacity-60 pointer-events-none"
                    style={{
                        background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15) 0%, rgba(20,20,20,0) 60%)"
                    }}
                />

                {/* 2. Atmospheric Fog/Glow (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent opacity-80" />

                {/* 3. Film Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
                />
            </div>
            {/* --- PAINTED MEMORIES (Hanging from "Strings") --- */}

            {/* Memory 1: Top Right (The Panda) - Hanging */}
            <motion.div
                initial={{ opacity: 0, rotate: 5, y: -100 }}
                animate={{
                    opacity: 1,
                    rotate: [5, 3, 5], // Gentle pendulum swing
                    y: 0,
                }}
                transition={{
                    opacity: { duration: 1, delay: 1 },
                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 1.5, type: "spring", bounce: 0.5, delay: 0.5 }
                }}
                className="absolute top-[-5%] right-[2%] md:right-[5%] z-20 w-36 md:w-48 origin-top cursor-pointer hidden md:block" // Use z-20 to be behind/contextual
                style={{ transformOrigin: "top center" }}
            >
                {/* The String */}
                <div className="absolute -top-[100vh] left-1/2 -translate-x-1/2 w-[1px] h-[100vh] bg-white/30" />

                {/* The Photo */}
                <div className="relative p-2 bg-white/95 backdrop-blur-sm rounded-sm shadow-2xl transform rotate-2 hover:scale-105 hover:rotate-0 transition-all duration-500 grayscale-[0.2] hover:grayscale-0">
                    {/* Tape/Pin Graphic */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-8 bg-rose-500/80 blur-[1px] rounded-sm opacity-80" />
                    <img src="/memories/Memories-1.jpg" alt="Memory 1" className="w-full h-auto rounded-sm opacity-95" />
                </div>
            </motion.div>

            {/* Memory 2: Top Left (The Party Character) - Hanging */}
            <motion.div
                initial={{ opacity: 0, rotate: -5, y: -100 }}
                animate={{
                    opacity: 1,
                    rotate: [-5, -3, -5], // Gentle pendulum swing
                    y: 0,
                }}
                transition={{
                    opacity: { duration: 1, delay: 1.2 },
                    rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
                    y: { duration: 1.8, type: "spring", bounce: 0.5, delay: 0.7 }
                }}
                className="absolute top-[5%] left-[2%] md:left-[5%] z-20 w-40 md:w-52 origin-top cursor-pointer hidden md:block" // Use z-20
                style={{ transformOrigin: "top center" }}
            >
                {/* The String */}
                <div className="absolute -top-[100vh] left-1/2 -translate-x-1/2 w-[1px] h-[100vh] bg-white/30" />

                {/* The Photo */}
                <div className="relative p-2 bg-white/95 backdrop-blur-sm rounded-sm shadow-2xl transform -rotate-1 hover:scale-105 hover:rotate-0 transition-all duration-500 grayscale-[0.2] hover:grayscale-0">
                    {/* Tape/Pin Graphic */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-8 bg-indigo-500/80 blur-[1px] rounded-sm opacity-80" />
                    <img src="/memories/Memories-2.jpg" alt="Memory 2" className="w-full h-auto rounded-sm opacity-95" />
                </div>
            </motion.div>

            {/* --- MAIN CONTENT --- */}
            <motion.div
                style={{ y: yText, opacity: opacityText }}
                className="relative z-10 w-full max-w-[95vw] h-full flex flex-col items-center justify-center pt-32 md:pt-48 pb-12 select-none"
            >




                {/* RADIO VISUALIZER (Floating Above) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="z-30 relative mb-8 md:mb-10"
                >
                    <RadioVisualizer />
                </motion.div>
                {/* HORIZONTAL TYPOGRAPHY - "To My BABy" LAYOUT */}
                <div className="flex flex-col items-center justify-center relative z-20 w-full px-4 text-center mt-4 md:mt-0">

                    {/* "To My" */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mb-[-2vw] md:mb-[-1vw] z-10"
                    >
                        <p className="font-serif italic text-3xl md:text-5xl text-white mix-blend-overlay" style={{ fontFamily: "var(--font-playfair), serif" }}>
                            To My
                        </p>
                    </motion.div>

                    {/* "BABy" */}
                    <div className="relative">
                        {/* --- MAGICAL SPARKLES (Text Aura) --- */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(40)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute bg-rose-300 rounded-full opacity-0"
                                    style={{
                                        width: Math.random() * 6 + 2 + "px", // Slightly larger for the big text
                                        height: Math.random() * 6 + 2 + "px",
                                        top: Math.random() * 120 - 10 + "%", // Scatter a bit outside
                                        left: Math.random() * 120 - 10 + "%",
                                        boxShadow: "0 0 15px rgba(244, 63, 94, 0.6)"
                                    }}
                                    animate={{
                                        opacity: [0, 0.8, 0],
                                        scale: [0, 1.5, 0],
                                        y: -40,
                                        rotate: [0, 180]
                                    }}
                                    transition={{
                                        duration: Math.random() * 4 + 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 2,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[18vw] leading-[1.15] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tighter pb-[4vw] px-[5vw] w-full text-center"
                            style={{ fontFamily: "var(--font-playfair), serif", overflow: "visible" }}
                        >
                            Babyyyyyy
                        </motion.h1>

                        {/* Star Decoration */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-4 -right-4 md:top-[15%] md:right-[-5%] text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]" // Pink Star
                        >
                            {/* Simple Star Icon */}
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-20 md:h-20">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                        </motion.div>
                    </div>

                </div>

            </motion.div>

            {/* --- SCROLL INDICATOR --- */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                className="absolute bottom-12 text-white/40 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
                <ArrowDown size={16} />
            </motion.div>

            {/* --- OVERLAY TEXTURE --- */}
            <div className="absolute inset-0 pointer-events-none z-20 mix-blend-soft-light opacity-30"
                style={{ background: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}
            />

        </section>
    );
}
