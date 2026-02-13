"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import canvasConfetti from "canvas-confetti";

export default function SolarEclipse() {
    const [isAligned, setIsAligned] = useState(false);
    const [hasProposed, setHasProposed] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse Physics
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth Moon movement
    const moonX = useSpring(mouseX, { stiffness: 120, damping: 20 });
    const moonY = useSpring(mouseY, { stiffness: 120, damping: 20 });

    // Alignment Progress (0 to 1) based on distance
    const distance = useMotionValue(1000);
    const glowIntensity = useTransform(distance, [300, 0], [0, 1]);
    const coronaScale = useTransform(distance, [200, 0], [1, 1.5]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Mouse relative to center
            const x = e.clientX - rect.left - centerX;
            const y = e.clientY - rect.top - centerY;

            mouseX.set(x);
            mouseY.set(y);

            // Calculate distance between moon center (mouse) and sun center (0,0)
            const d = Math.sqrt(x * x + y * y);
            distance.set(d);

            // Trigger Alignment (Threshold < 15px)
            if (d < 15 && !isAligned) {
                setIsAligned(true);
            } else if (d > 15 && isAligned && !hasProposed) {
                setIsAligned(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isAligned, hasProposed]);

    // Handle "Totality" - Trigger Proposal
    useEffect(() => {
        if (isAligned && !hasProposed) {
            const timer = setTimeout(() => {
                setHasProposed(true);
                fireConfetti();
            }, 1000); // Hold for 1 second to confirm
            return () => clearTimeout(timer);
        }
    }, [isAligned, hasProposed]);

    const fireConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            canvasConfetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#fbbf24', '#ffffff', '#f59e0b'] // Gold, White, Amber
            });
            canvasConfetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#fbbf24', '#ffffff', '#f59e0b']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden cursor-none"
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_100%)] z-0" />

            {/* Instruction Text (Fades out when close) */}
            <motion.div
                style={{ opacity: useTransform(distance, [300, 100], [1, 0]) }}
                className="absolute top-20 text-white/30 tracking-[0.5em] text-xs uppercase z-10"
            >
                Align the Heavenly Bodies
            </motion.div>

            {/* --- THE SUN (Stationary Center) --- */}
            <motion.div
                className="absolute w-48 h-48 rounded-full bg-[#fbbf24] z-10"
                style={{
                    boxShadow: useTransform(
                        glowIntensity,
                        [0, 1],
                        ["0 0 20px rgba(251, 191, 36, 0.2)", "0 0 100px rgba(251, 191, 36, 0.8)"] // Corona grows
                    ),
                    scale: hasProposed ? 1.2 : 1
                }}
            >
                {/* Diamond Ring Flash */}
                <motion.div
                    className="absolute -top-2 -left-2 w-full h-full rounded-full bg-white blur-xl"
                    style={{ opacity: isAligned ? 0.8 : 0 }}
                    animate={{ rotate: isAligned ? 180 : 0 }}
                />
            </motion.div>

            {/* --- THE MOON (Follows Mouse) --- */}
            <motion.div
                className="absolute w-48 h-48 rounded-full bg-black z-20 pointer-events-none border border-white/5"
                style={{ x: moonX, y: moonY }}
            >
                {/* Moon Texture/Crater hint? Keep it pitch black for contrast but with slight rim */}
                <div className="w-full h-full rounded-full bg-black shadow-[inset_-10px_-10px_20px_rgba(255,255,255,0.05)]" />
            </motion.div>

            {/* --- PROPOSAL REVEAL --- */}
            <AnimatePresence>
                {hasProposed && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="absolute z-30 text-center flex flex-col items-center gap-8"
                    >
                        <h1 className="text-5xl md:text-7xl text-white font-serif tracking-tight drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]">
                            Will You Be My Valentine?
                        </h1>

                        <div className="flex gap-4 mt-8">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(251,191,36,0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-[#fbbf24] text-black font-bold tracking-widest uppercase text-sm rounded-full"
                                onClick={() => {
                                    fireConfetti();
                                    // Could trigger Sound here
                                }}
                            >
                                Yes, Forever
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- "NO" BUTTON (Funny/Playful - Only appears if they try to leave?) --- */}
            {/* Actually, for "Classy", let's skip the "No" button entirely. */}

        </section>
    );
}
