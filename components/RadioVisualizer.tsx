"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RadioVisualizer() {
    return (
        <div className="relative group">

            {/* --- STAMP: MADE FOR FAVOUR --- */}
            <motion.div
                initial={{ opacity: 0, y: 10, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: -5 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 z-0"
            >
                <div className="bg-[#111] text-white/90 px-4 py-2 rounded-sm border border-white/10 shadow-2xl backdrop-blur-md">
                    <div className="flex flex-col items-center leading-none">
                        <span className="text-[7px] uppercase tracking-[0.3em] font-sans opacity-60 mb-1">Made For</span>
                        <span className="text-xl italic font-serif" style={{ fontFamily: "var(--font-playfair), serif" }}>Stephsss</span>
                    </div>
                </div>
            </motion.div>

            {/* --- RADIO BODY --- */}
            {/* Darker, more premium casing (Gunmetal/Titanium look) */}
            <div className="relative z-10 w-[340px] h-[170px] md:w-[420px] md:h-[210px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center p-5 gap-5 border border-white/10">

                {/* --- SPEAKER GRILLE (LEFT) --- */}
                <div className="w-[140px] h-full relative bg-[#151515] rounded-[16px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)] overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
                    {/* Perforated Metal Texture - simulated with radial gradient dots */}
                    <div className="absolute inset-0 opacity-80"
                        style={{
                            backgroundImage: "radial-gradient(#080808 30%, transparent 31%)",
                            backgroundSize: "6px 6px",
                            backgroundPosition: "0 0"
                        }}
                    />
                    {/* Subtle Metallic Shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* --- CENTER CONTROLS (Knobs) --- */}
                <div className="flex flex-col justify-center gap-5 h-full py-4">
                    {/* Volume Knob */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#333] to-[#111] shadow-[0_4px_8px_rgba(0,0,0,0.4),0_0_0_1px_#000] flex items-center justify-center relative">
                        {/* Indicator Line */}
                        <div className="w-0.5 h-3 bg-white/80 rounded-full absolute top-1" />
                    </div>
                    {/* Tuning Knob */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#333] to-[#111] shadow-[0_4px_8px_rgba(0,0,0,0.4),0_0_0_1px_#000] flex items-center justify-center relative">
                        <div className="w-0.5 h-2 bg-white/80 rounded-full absolute top-1 rotate-45 transform origin-bottom" />
                    </div>
                </div>

                {/* --- DISPLAY SCREEN (RIGHT - RADIAL) --- */}
                <div className="flex-1 h-full bg-[#050505] rounded-[16px] overflow-hidden relative shadow-[inset_0_2px_12px_rgba(0,0,0,1)] border border-[#222]">

                    {/* Screen Glare */}
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent pointer-events-none z-20" />

                    {/* RADIAL VISUALIZER */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">

                        {/* 1. Center Pulsing Core */}
                        <motion.div
                            animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                            className="w-10 h-10 rounded-full bg-cyan-500 blur-md opacity-90 shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                        />

                        {/* 2. Expanding Ripples (Beats) */}
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full border border-cyan-400/30"
                                initial={{ width: 40, height: 40, opacity: 0.8 }}
                                animate={{
                                    width: [40, 140],
                                    height: [40, 140],
                                    opacity: [0.6, 0],
                                    borderWidth: [2, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.6,
                                    ease: "easeOut"
                                }}
                            />
                        ))}

                        {/* 3. Rotating Tech Ring (Dashed) */}
                        <motion.div
                            className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-cyan-500/20"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Metadata Overlay */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
                        <div className="flex flex-col">
                            <span className="text-[6px] text-cyan-400/70 font-mono tracking-widest uppercase mb-0.5">Frequency</span>
                            <span className="text-[9px] text-white/90 font-medium tracking-wide">105.5 FM</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_red]" />
                            <span className="text-[6px] text-red-400 font-bold uppercase tracking-wider">LIVE</span>
                        </div>
                    </div>

                    {/* CRT Scanlines Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[15] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

                </div>

            </div>

        </div>
    );
}
