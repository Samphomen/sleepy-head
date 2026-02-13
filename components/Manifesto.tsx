"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2 } from "lucide-react";

// --- CONTENT CONFIGURATION ---
const SECTIONS = [
    {
        id: "spark",
        title: "The Spark",
        content: "I think about how we met more than I admit. Not just because the memory is precious, but because I'm still amazed at how something so simple quietly became everything.\n\nThere were moments beyond our control; like when we switched teams. And then there were the ones we chose, like those movies we'd watch together. I'd arrive worn down from work, ready to be miserable, and there you'd be, this beautiful girl making me laugh when I'd forgotten how. You once asked if I'd hoped all of this would happen. Honestly, it wasn't hope. It wasn't guessing. It was knowing. A calm, certain knowing.\n\nBeing around you has never felt rushed or demanding. It's beautifully calm. And that calm, it stays with me even in your absence, like you're quietly there in my peace.\n\nSometimes I sit and retrace it all: how we met, where we are now, why it unfolded this way. And every time, I'm reminded that the most extraordinary things in life rarely announce themselves. They simply arrive... and transform everything in silence.\n\nI love you."
    }
];

interface ManifestoProps {
    onComplete: () => void;
}

export default function Manifesto({ onComplete }: ManifestoProps) {
    const [activeSection, setActiveSection] = useState<string | null>(null); // Start empty, wait for click
    const [viewedSections, setViewedSections] = useState<Set<string>>(new Set());
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // --- TYPEWRITER EFFECT ---
    useEffect(() => {
        if (!activeSection) return;

        const targetContent = SECTIONS.find(s => s.id === activeSection)?.content || "";
        let currentIndex = 0;
        setDisplayedText("");
        setIsTyping(true);

        const typingInterval = setInterval(() => {
            if (currentIndex <= targetContent.length) {
                setDisplayedText(targetContent.slice(0, currentIndex));
                currentIndex++;
            } else {
                setIsTyping(false);
                clearInterval(typingInterval);

                // Mark section as viewed
                setViewedSections(prev => {
                    const newSet = new Set(prev);
                    newSet.add(activeSection);
                    return newSet;
                });
            }
        }, 50); // Slower for magical effect

        return () => clearInterval(typingInterval);
    }, [activeSection]);

    // --- COMPLETION CHECK ---
    useEffect(() => {
        if (viewedSections.size === SECTIONS.length) {
            // Slight delay before unlocking the next part
            const timeout = setTimeout(() => {
                onComplete();
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [viewedSections, onComplete]);

    return (
        <section className="relative min-h-[80vh] w-full flex items-center justify-center py-20 px-4 md:px-20 overflow-hidden">

            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">

                {/* --- LEFT COLUMN: NAVIGATION --- */}
                <div className="md:col-span-4 flex flex-col justify-center space-y-6">
                    <h2 className="text-white/40 uppercase tracking-[0.2em] text-sm mb-4 font-mono">
                        Click to Spark
                    </h2>

                    {SECTIONS.map((section) => {
                        const isActive = activeSection === section.id;
                        const isViewed = viewedSections.has(section.id);

                        return (
                            <motion.button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`text-left group relative py-4 transition-all duration-300 ${isActive ? "pl-6" : "pl-0"}`}
                            >
                                {/* Active Indicator Line */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeLine"
                                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-rose-500"
                                    />
                                )}

                                {/* Gold Sparkles on Active Section */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeSparkles"
                                        className="absolute -left-12 top-1/2 -translate-y-1/2"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, ease: "backOut" }}
                                    >
                                        <Sparkles
                                            size={32}
                                            strokeWidth={1}
                                            className="text-amber-400 fill-amber-400/20 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)] animate-pulse"
                                        />
                                    </motion.div>
                                )}

                                <span
                                    className={`text-3xl md:text-5xl italic tracking-tight transition-colors duration-300 relative z-10
                                    ${isActive ? "text-white" : "text-white/30 group-hover:text-white/60"}`}
                                    style={{ fontFamily: "var(--font-bodoni), serif" }}
                                >
                                    {section.title}
                                    {/* Burst on Active, key forces re-render if clicked again */}
                                    {isActive && <PinkGlitterBurst key={Date.now()} />}
                                </span>

                                {/* Viewed Indicator */}
                                {isViewed && !isActive && (
                                    <span className="ml-3 text-rose-500/50 text-xs">●</span>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* --- RIGHT COLUMN: DISPLAY (TYPEWRITER) --- */}
                <div className="md:col-span-8 min-h-[400px] flex items-center">
                    <motion.div
                        key={activeSection || "idle"}
                        initial={{
                            boxShadow: "0 0 0 rgba(0,0,0,0), inset 0 0 0 1px rgba(255, 255, 255, 0.02)",
                            background: "rgba(0, 0, 0, 0.3)"
                        }}
                        animate={{
                            boxShadow: activeSection ? "0 0 40px rgba(244, 63, 94, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.2)" : "0 0 0 rgba(0,0,0,0), inset 0 0 0 1px rgba(255, 255, 255, 0.02)",
                            background: activeSection ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.3)"
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative w-full p-8 md:p-12 rounded-2xl backdrop-blur-md min-h-[300px] md:min-h-[400px] flex flex-col justify-center"
                    >

                        {/* MAIL HEADER */}
                        <div className="absolute top-0 left-0 right-0 h-16 border-b border-white/10 flex items-center px-8 justify-between bg-white/5 rounded-t-2xl">
                            <div className="flex flex-col">
                                <span className="text-xs text-white/40 font-mono uppercase tracking-wider mb-1">To:</span>
                                <span className="text-white font-medium tracking-wide">Stephsss</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-white/40 font-mono uppercase tracking-wider mb-1">From:</span>
                                <span className="text-white font-medium tracking-wide">Me</span>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {activeSection ? (
                                <motion.div
                                    key={activeSection}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="pt-12"
                                >
                                    <p
                                        className="text-white/80 text-base md:text-lg leading-relaxed font-sans font-light tracking-wide"
                                        style={{ whiteSpace: "pre-wrap" }}
                                    >
                                        {displayedText}
                                        {isTyping && (
                                            <span className="inline-block ml-1 align-baseline relative -top-1">
                                                <motion.span
                                                    animate={{
                                                        rotate: [0, 15, -5, 0],
                                                        x: [0, 2, -2, 0]
                                                    }}
                                                    transition={{ repeat: Infinity, duration: 0.4 }}
                                                    className="inline-block"
                                                >
                                                    <Wand2 size={24} className="text-rose-400 drop-shadow-[0_0_12px_rgba(251,113,133,0.8)]" />
                                                </motion.span>
                                            </span>
                                        )}
                                    </p>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-white/20 h-full pt-10">
                                    <p className="font-mono text-sm tracking-widest uppercase animate-pulse">
                                        Select "The Spark" to read...
                                    </p>
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Footer Info */}
                        <div className="absolute bottom-6 right-8 text-white/20 text-xs font-mono">
                            {activeSection ? "Manifesto // " + activeSection.toUpperCase() : "System Ready"}
                        </div>

                    </motion.div>
                </div>

            </div>
        </section >
    );
}

// --- SUB-COMPONENT: PINK GLITTER BURST ---
function PinkGlitterBurst() {
    // Generate many particles for a "Massive Burst"
    const particles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        angle: Math.random() * 360,
        distance: Math.random() * 80 + 60, // Explode outwards further (60-140px) to clear text
        size: Math.random() * 6 + 2,
        color: Math.random() > 0.5 ? "#fb7185" : "#f43f5e", // Rose-400 or Rose-500
        delay: Math.random() * 0.1,
        rotation: Math.random() * 360,
    }));

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
            {/* Flash Effect */}
            <motion.div
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute w-32 h-12 bg-radial-gradient(circle, rgba(251,113,133,0.6) 0%, transparent 70%) rounded-full blur-md"
            />

            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
                    animate={{
                        x: Math.cos(p.angle * (Math.PI / 180)) * p.distance,
                        y: Math.sin(p.angle * (Math.PI / 180)) * p.distance * 0.5, // Flatten slightly for text aspect ratio
                        opacity: 0,
                        scale: [0, 1, 0],
                        rotate: p.rotation + 180,
                    }}
                    transition={{
                        duration: 1 + Math.random(),
                        ease: "easeOut",
                        delay: p.delay,
                    }}
                >
                    {/* Random Shapes: Circle or Star */}
                    {p.id % 2 === 0 ? (
                        <div
                            className="rounded-full"
                            style={{
                                backgroundColor: p.color,
                                width: p.size,
                                height: p.size,
                                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                            }}
                        />
                    ) : (
                        <svg
                            viewBox="0 0 24 24"
                            width={p.size * 1.5}
                            height={p.size * 1.5}
                            fill={p.color}
                            className="drop-shadow-md"
                        >
                            <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9L12 2Z" />
                        </svg>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
