"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface StartScreenProps {
    onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
    return (
        <motion.div
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
        >
            {/* --- TEXTURES --- */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black" />
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
                />
            </div>

            {/* --- PULSING HEART BUTTON --- */}
            <motion.button
                onClick={onStart}
                className="relative z-10 group flex flex-col items-center justify-center outline-none border-none ring-0 bg-transparent"
                style={{ WebkitTapHighlightColor: "transparent" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Heart Icon (Lucide) */}
                <div className="relative flex items-center justify-center w-32 h-32">
                    {/* Glow Behind Heart Only (Radial Gradient to prevent box glitch) */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
                        style={{
                            background: "radial-gradient(circle, rgba(225, 29, 72, 0.4) 0%, transparent 70%)"
                        }}
                    />

                    <Heart
                        fill="currentColor"
                        className="relative z-10 w-24 h-24 md:w-32 md:h-32 text-rose-600 drop-shadow-[0_0_30px_rgba(225,29,72,0.6)] transition-all duration-500 group-hover:text-rose-500 group-hover:drop-shadow-[0_0_50px_rgba(225,29,72,0.8)]"
                    />
                </div>

                {/* Text Prompt */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-8 flex flex-col items-center text-center"
                >
                    <span className="text-white/80 text-lg md:text-xl tracking-[0.2em] font-serif italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Begin the Journey
                    </span>
                    <span className="text-white/30 text-[10px] uppercase tracking-widest mt-2 font-sans">
                        (Tap Heart to Proceed)
                    </span>
                </motion.div>
            </motion.button>

        </motion.div>
    );
}
