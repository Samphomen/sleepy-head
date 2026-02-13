"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FirstKiss() {
    return (
        <section className="relative w-full min-h-screen bg-black flex flex-col md:flex-row items-center justify-center overflow-hidden font-sans select-none">

            {/* Import Tech Font */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Pinyon+Script&display=swap');
            `}</style>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-black to-black" />
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">

                {/* --- LEFT: THE DASHBOARD MEMORY --- */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center md:items-end text-center md:text-right space-y-2"
                >
                    {/* "Dashboard" Display container */}
                    <div className="bg-black/50 border border-red-900/30 p-8 rounded-2xl backdrop-blur-sm shadow-[0_0_50px_rgba(220,38,38,0.1)]">
                        <div className="text-red-600/60 text-xs tracking-[0.4em] uppercase mb-4 font-bold">
                            Time Stamp
                        </div>

                        {/* THE TIME */}
                        <h1 className="text-6xl md:text-8xl text-red-600 font-bold tracking-tighter drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] leading-none" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                            11:56<span className="text-2xl md:text-3xl align-top ml-2 opacity-50">PM</span>
                        </h1>

                        {/* THE DATE */}
                        <div className="text-red-800/80 text-lg md:text-xl tracking-[0.3em] font-mono mt-2">
                            FEB 11 2026
                        </div>

                        {/* AUDIO TRACK */}
                        <div className="mt-8 pt-6 border-t border-red-900/30 flex flex-col items-center md:items-end">
                            <div className="flex items-center gap-2 text-red-500/80 text-xs uppercase tracking-widest mb-1">
                                <span className="animate-pulse">●</span> Now Playing
                            </div>
                            <div className="text-white/90 text-2xl font-serif italic">
                                Selfish
                            </div>
                            <div className="text-white/40 text-sm font-light">
                                Justin Timberlake
                            </div>
                        </div>
                    </div>
                </motion.div>


                {/* --- RIGHT: THE REAL PHOTO --- */}
                <div className="relative">
                    {/* --- THE REAL PHOTO --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
                        transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.4 }}
                        viewport={{ once: true }}
                        className="relative group z-10"
                    >
                        {/* Glow Layer */}
                        <div
                            className="absolute -inset-4 bg-rose-600/20 blur-xl rounded-[2rem] group-hover:bg-rose-600/30 transition-all duration-700"
                        />

                        {/* The Photo Container */}
                        <div className="relative w-[300px] md:w-[400px] h-[400px] md:h-[500px] bg-white p-3 shadow-2xl rotate-2 transform transition-transform duration-700 hover:rotate-0 hover:scale-[1.02]">
                            {/* Film Grain/Touch */}
                            <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dust.png')]" />

                            {/* The Image */}
                            <div className="w-full h-full overflow-hidden bg-black/10 relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/first-kiss.jpg"
                                    alt="First Kiss Memory: Dashboard showing Selfish by Justin Timberlake"
                                    className="w-full h-full object-cover filter contrast-[1.1] saturate-[1.1] sepia-[0.1]"
                                />
                            </div>

                            {/* Tape Effect */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/20 backdrop-blur-sm rotate-2 shadow-sm border border-white/10 z-30 opacity-60" />
                        </div>
                    </motion.div>

                    {/* --- THE KISS EMOJI (To the side) --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0, x: -50, rotate: -45 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, rotate: -15 }}
                        transition={{ duration: 0.8, delay: 0.6, type: "spring", bounce: 0.5 }}
                        viewport={{ once: true }}
                        className="absolute -bottom-20 -left-16 md:-left-32 z-20 pointer-events-none flex flex-col items-center"
                    >
                        <div className="text-[120px] md:text-[180px] filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-pulse-slow leading-none">
                            💋
                        </div>
                        <p className="text-white/40 text-sm md:text-base mt-2 tracking-[0.2em] uppercase font-light drop-shadow-md" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                            i wanted to remember
                        </p>
                    </motion.div>
                </div>

            </div>
        </section >
    );
}
