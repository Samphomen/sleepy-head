"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc, Play, Pause, SkipForward, SkipBack } from "lucide-react";

export default function VinylPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const duration = 180; // 3 minutes in seconds
    const audioContextRef = useRef<AudioContext | null>(null);

    // --- AUDIO VISUALIZER SIMULATION ---
    // (In a real app, this would analyze the audio stream)
    const [bars, setBars] = useState<number[]>(new Array(20).fill(10));

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setBars(prev => prev.map(() => Math.random() * 40 + 10)); // Random height 10-50
            setCurrentTime(prev => (prev < duration ? prev + 1 : 0));
        }, 100);

        return () => clearInterval(interval);
    }, [isPlaying]);

    // Format time
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <section className="relative min-h-screen w-full bg-[#1a1a1a] flex flex-col items-center justify-center py-20 overflow-hidden text-white">

            {/* Background Vinyl Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]" />

            {/* --- PLAYER CONTAINER --- */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-md">

                {/* VINYL RECORD */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12">
                    {/* The Record Itself */}
                    <motion.div
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full rounded-full bg-black border-4 border-gray-800 shadow-2xl flex items-center justify-center relative overflow-hidden"
                    >
                        {/* Grooves (Radial Gradient) */}
                        <div className="absolute inset-2 rounded-full border border-gray-800 opacity-50" />
                        <div className="absolute inset-8 rounded-full border border-gray-800 opacity-40" />
                        <div className="absolute inset-16 rounded-full border border-gray-800 opacity-30" />
                        <div className="absolute inset-24 rounded-full border border-gray-800 opacity-20" />

                        {/* Label */}
                        <div className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center border-4 border-black relative z-10">
                            <span className="text-[10px] uppercase font-bold text-black tracking-widest text-center leading-tight">
                                Our<br />Song<br />Vol. 1
                            </span>
                        </div>
                    </motion.div>

                    {/* Tone Arm (Stylized) */}
                    <motion.div
                        initial={{ rotate: -30 }}
                        animate={{ rotate: isPlaying ? 0 : -30 }}
                        transition={{ duration: 0.5 }}
                        className="absolute -top-10 -right-10 w-4 h-40 bg-gray-400 origin-top rounded-full shadow-lg border-2 border-gray-500 z-20"
                    />
                </div>

                {/* TRACK INFO */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl italic tracking-tight mb-2" style={{ fontFamily: "var(--font-bodoni), serif" }}>My Favorite Part</h2>
                    <p className="text-rose-400 font-medium tracking-wide">Mac Miller ft. Ariana Grande</p>
                </div>

                {/* PROGRESS BAR & VISUALIZER */}
                <div className="w-full px-8 mb-8">
                    {/* Visualizer Bars */}
                    <div className="flex justify-center items-end gap-1 h-12 mb-4">
                        {isPlaying ? (
                            bars.map((height, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1.5 bg-rose-500 rounded-t-sm"
                                    animate={{ height }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                />
                            ))
                        ) : (
                            <div className="w-full h-[1px] bg-gray-700" />
                        )}
                    </div>

                    {/* Scrub Bar */}
                    <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                        <span>{formatTime(currentTime)}</span>
                        <div className="flex-grow h-1 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-rose-500"
                                style={{ width: `${(currentTime / duration) * 100}%` }}
                            />
                        </div>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* CONTROLS */}
                <div className="flex items-center gap-8">
                    <button className="p-3 text-gray-400 hover:text-white transition-colors">
                        <SkipBack size={24} />
                    </button>

                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
                    </button>

                    <button className="p-3 text-gray-400 hover:text-white transition-colors">
                        <SkipForward size={24} />
                    </button>
                </div>

            </div>

        </section>
    );
}
