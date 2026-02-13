"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Crown Shape Coordinates
const STAR_POINTS = [
    { id: 1, x: 25, y: 70 }, // Bottom Left
    { id: 2, x: 75, y: 70 }, // Bottom Right
    { id: 3, x: 85, y: 30 }, // Right Spike Tip
    { id: 4, x: 65, y: 50 }, // Right Dip
    { id: 5, x: 50, y: 20 }, // Middle Spike Tip
    { id: 6, x: 35, y: 50 }, // Left Dip
    { id: 7, x: 15, y: 30 }, // Left Spike Tip
];

interface StargazerProps {
    onComplete?: () => void;
}

export default function Stargazer({ onComplete }: StargazerProps) {
    const [connections, setConnections] = useState<[number, number][]>([]);
    const [activeStar, setActiveStar] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    const handleStarClick = (id: number) => {
        if (isComplete) return;

        if (activeStar === null) {
            setActiveStar(id);
        } else {
            if (activeStar !== id) {
                // Check if connection exists
                const exists = connections.some(
                    ([a, b]) => (a === activeStar && b === id) || (a === id && b === activeStar)
                );

                if (!exists) {
                    const newConnections = [...connections, [activeStar, id] as [number, number]];
                    setConnections(newConnections);

                    // Check for completion (7 connections for the crown loop)
                    if (newConnections.length >= 7) {
                        setIsComplete(true);
                        setActiveStar(null);
                        if (onComplete) {
                            setTimeout(onComplete, 4000); // Longer delay to read the message
                        }
                    } else {
                        setActiveStar(id);
                    }
                } else {
                    setActiveStar(id);
                }
            }
        }
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center select-none"
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] z-10 pointer-events-none" />
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse" />

            {/* Instruction */}
            <div className="absolute top-10 z-20 transition-opacity duration-1000" style={{ opacity: isComplete ? 0 : 0.7 }}>
                <p className="text-white font-mono text-xs tracking-[0.4em] uppercase">
                    Reveal Her Title
                </p>
            </div>

            {/* The Constellation Canvas */}
            <div className="relative w-full h-[60vh] max-w-2xl mx-auto">
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {/* Drawn Connections */}
                    {connections.map(([startId, endId], i) => {
                        const start = STAR_POINTS.find(s => s.id === startId);
                        const end = STAR_POINTS.find(s => s.id === endId);
                        if (!start || !end) return null;
                        return (
                            <motion.line
                                key={i}
                                x1={`${start.x}%`} y1={`${start.y}%`}
                                x2={`${end.x}%`} y2={`${end.y}%`}
                                stroke="rgba(255, 230, 100, 0.4)"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        );
                    })}

                    {/* Completed Glow Shape (Crown Path) */}
                    {isComplete && (
                        <motion.path
                            // Crown Path
                            d={`
                                M 25 70
                                L 75 70
                                L 85 30
                                L 65 50
                                L 50 20
                                L 35 50
                                L 15 30
                                Z
                             `}
                            fill="rgba(255, 215, 0, 0.05)"
                            stroke="rgba(255, 215, 0, 0.8)"
                            strokeWidth="3"
                            strokeLinejoin="round"
                            initial={{ opacity: 0, scale: 0.9, pathLength: 0 }}
                            animate={{ opacity: 1, scale: 1, pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="drop-shadow-[0_0_25px_rgba(255,215,0,0.8)]"
                        />
                    )}
                </svg>

                {/* Stars */}
                {STAR_POINTS.map((star) => {
                    const isActive = activeStar === star.id;
                    const isConnected = connections.some(([a, b]) => a === star.id || b === star.id);

                    return (
                        <motion.button
                            key={star.id}
                            onClick={() => handleStarClick(star.id)}
                            className={`absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full z-20 transition-all duration-300
                                ${isActive ? "bg-amber-400 scale-150 shadow-[0_0_15px_rgba(251,191,36,1)]" :
                                    isConnected ? "bg-white scale-110 shadow-[0_0_8px_white]" : "bg-white/60 hover:bg-white hover:scale-125"}
                            `}
                            style={{ left: `${star.x}%`, top: `${star.y}%` }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <div className={`absolute inset-0 rounded-full bg-inherit animate-ping opacity-50 ${isActive ? "duration-1000" : "duration-[3000ms]"}`} />
                        </motion.button>
                    );
                })}
            </div>

            {/* Success Message */}
            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-24 z-30 text-center px-4"
                    >
                        <motion.h2
                            initial={{ scale: 0.8 }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="text-4xl md:text-6xl italic text-amber-200 drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]"
                            style={{ fontFamily: "var(--font-bodoni), serif" }}
                        >
                            That&apos;s why you&apos;re my princess
                        </motion.h2>

                        {/* Sparkles / Particles */}
                        <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-visible">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 0, y: 0 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        x: (Math.random() - 0.5) * 400,
                                        y: (Math.random() - 0.5) * 200,
                                        scale: [0, 1.5, 0]
                                    }}
                                    transition={{
                                        duration: 2 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 2
                                    }}
                                    className="absolute w-1 h-1 bg-amber-200 rounded-full shadow-[0_0_10px_white]"
                                />
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 2, duration: 1 }}
                            className="text-white/40 text-xs mt-8 uppercase tracking-[0.6em] animate-pulse"
                        >
                            Keep Scrolling ↓
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
