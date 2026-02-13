"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

// --- MEMORIES CONFIGURATION ---
const MEMORIES = [
    {
        id: 1,
        src: "/videos/memories/Birthday-Girl.mp4",
        type: "video",
        caption: "Dancing cutie patootie",
        captionStyle: "top-1/2 -translate-y-1/2 left-[-40px] rotate-[-15deg] z-50",
        tagColor: "bg-lime-200/90 text-lime-900 border-lime-300 backdrop-blur-sm",
        rotation: -4,
        yOffset: 20,
    },
    {
        id: 2,
        src: "/videos/memories/My-%231-fan.mp4",
        type: "video",
        caption: "Fan girl",
        captionStyle: "top-[-30px] left-[-15px] rotate-[-12deg] z-50",
        tagColor: "bg-orange-200/90 text-orange-900 border-orange-300 backdrop-blur-sm",
        rotation: 3,
        yOffset: -20,
    },
    {
        id: 3,
        src: "/videos/memories/My-Sexy-Gyal.mp4",
        type: "video",
        caption: "My Sexy View",
        captionStyle: "bottom-[-25px] left-1/2 -translate-x-1/2 rotate-[3deg] z-50",
        tagColor: "bg-purple-200/90 text-purple-900 border-purple-300 backdrop-blur-sm",
        rotation: -3,
        yOffset: 30,
    },
    {
        id: 4,
        src: "/videos/memories/Shine-on-em.mp4",
        type: "video",
        caption: "Omalicha nwa",
        captionStyle: "top-[-15px] right-[-20px] rotate-[6deg] z-50",
        tagColor: "bg-rose-200/90 text-rose-900 border-rose-300 backdrop-blur-sm",
        rotation: 5,
        yOffset: -10,
    },
];

export default function Gallery() {
    return (
        <section className="relative min-h-[100vh] w-full overflow-hidden flex flex-col items-center justify-center py-24">

            {/* --- BACKGROUND TEXTURE: Subtle Grid --- */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
            />

            {/* --- DECORATION: Night Nebula (Left) --- */}
            <div className="absolute top-[10%] left-[-10%] w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] z-0 pointer-events-none opacity-40">
                <motion.div
                    className="w-full h-full bg-rose-950/40 rounded-full blur-[120px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* --- DECORATION: Deep Indigo Glow (Right) --- */}
            <div className="absolute bottom-[5%] right-[-10%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] z-0 pointer-events-none opacity-30">
                <motion.div
                    className="w-full h-full bg-indigo-950/40 rounded-full blur-[150px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -50, 0],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* --- DECORATION: Subtle Sparkles (Stars) --- */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}
            />

            {/* --- INTERACTION GUIDE --- */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute top-10 z-20 flex items-center gap-2 text-white/40 text-xs md:text-sm font-mono tracking-widest uppercase mix-blend-screen"
            >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                Reliving memories...
            </motion.div>

            {/* --- CLASSIC MESSY ROW LAYOUT --- */}
            <div className="relative z-10 w-full max-w-[95vw] px-4 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0 md:-space-x-12 mb-20 md:mb-28 mt-24 md:mt-20">
                {MEMORIES.map((memory) => (
                    <MemoryFrame key={memory.id} memory={memory} />
                ))}
            </div>

            {/* --- DESCRIPTIVE TEXT BLOCK --- */}
            <div className="relative z-10 text-center max-w-3xl px-6">
                <p
                    className="text-2xl md:text-4xl text-white/80 italic leading-relaxed mb-12 tracking-wide drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    style={{ fontFamily: "var(--font-bodoni), serif" }}
                >
                    &quot;Every little moment I managed to capture or steal was a moment cherished beyond&quot;
                </p>

                {/* Bouncing Arrow */}
                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex justify-center text-rose-300/40"
                >
                    <ArrowDown size={32} strokeWidth={1.5} />
                </motion.div>
            </div>

        </section>
    );
}

// --- SUB-COMPONENT: MEMORY FRAME WITH HOVER PLAY ---
function MemoryFrame({ memory }: { memory: any }) {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    // Auto-play ensured by attributes, no hover logic needed for playback

    return (
        <motion.div
            initial={{ rotate: memory.rotation, y: memory.yOffset }}
            whileHover={{ scale: 1.15, rotate: 0, y: 0, zIndex: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative group cursor-pointer shrink-0"
        >
            {/* Frameless Video Container */}
            <div className="relative w-[280px] md:w-[350px] aspect-[4/5] rounded-xl overflow-hidden shadow-2xl transition-all">

                {/* Video Container */}
                <div className="w-full h-full bg-black overflow-hidden relative rounded-lg">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    >
                        <source src={memory.src} type={memory.src.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
                    </video>

                    {/* Gloss Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
            </div>

            {/* --- INDEPENDENT MESSY STICKER/TAG (Independent Interaction) --- */}
            <motion.div
                className={`absolute pointer-events-auto cursor-default ${memory.captionStyle}`}
                whileHover={{ scale: 1.1, rotate: 0, zIndex: 60 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <div className={`px-4 py-1.5 rounded-full border shadow-[0_4px_12px_rgba(0,0,0,0.3)] ${memory.tagColor}`}>
                    <p
                        className="text-sm md:text-base font-bold tracking-wide whitespace-nowrap"
                        style={{ fontFamily: "var(--font-bodoni), serif" }}
                    >
                        {memory.caption}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}
