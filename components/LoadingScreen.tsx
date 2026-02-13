"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulating a load time (cinematic pacing)
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 800); // Slight pause at 100%
                    return 100;
                }
                // Random increments for realism
                return prev + Math.random() * 15;
            });
        }, 300);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
        >
            {/* --- TEXTURES (Matching Hero) --- */}
            <div className="absolute inset-0 z-0">
                {/* Radial Gradient for Depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/20 via-black to-black" />

                {/* Film Grain */}
                <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
                    style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
                />

                {/* Stardust/Scratches */}
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen"
                    style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}
                />
            </div>

            {/* --- CONTENT --- */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Percentage */}
                <motion.div
                    className="text-8xl md:text-9xl font-black text-rose-500 tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {Math.min(100, Math.floor(progress))}%
                </motion.div>

                {/* Status Text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/40 text-xs tracking-[0.4em] uppercase font-light"
                >
                    Loading Memories...
                </motion.p>
            </div>

            {/* Progress Bar (Thin Line) */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-rose-900/20">
                <motion.div
                    className="h-full bg-rose-500 shadow-[0_0_20px_#f43f5e]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                />
            </div>
        </motion.div>
    );
}
