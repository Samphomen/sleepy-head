"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Letter() {
    const [isOpen, setIsOpen] = useState(false);

    // --- THE CONTENT OF YOUR LETTER ---
    const LETTER_CONTENT = (
        <div className="space-y-6 text-gray-800">
            <p>My Dearest Sleepy Head,</p>
            <p>
                I’ve been trying to find the perfect way to tell you how much you mean to me.
                You are the missing piece I didn’t know I was looking for.
            </p>
            <p>
                From the quiet mornings to the chaotic days, you make everything feel
                like a movie scene I never want to end.
            </p>
            <p>
                Thank you for being my peace, my cuddle bunny and my favorite bully.
            </p>
            <div className="pt-8 text-right">
                <p className="font-serif italic text-xl text-rose-600">Forever Yours,</p>
                <p className="font-bold text-lg mt-2">Shaqsss ❤️</p>
            </div>
        </div>
    );

    return (
        <section className="relative min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden py-20 px-4">

            {/* Import Typewriter Font */}
            <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
      `}</style>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#331118_0%,_#000000_100%)] opacity-60" />
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
            </div>

            <div className="relative w-full max-w-6xl flex items-center justify-center h-[600px]">

                {/* --- THE ENVELOPE (Slides Left) --- */}
                <motion.div
                    className="relative z-20 w-[350px] md:w-[500px] h-[250px] md:h-[350px] perspective-1000"
                    initial={false}
                    animate={isOpen ? { x: -250, rotateY: 10 } : { x: 0, rotateY: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }} // Slide delay to let ribbon untie
                >
                    {/* Envelope Body (CSS Art) */}
                    <div className="absolute inset-0 bg-[#fdfbf7] rounded-lg shadow-2xl flex items-center justify-center overflow-hidden border border-gray-200">
                        {/* Paper Texture */}
                        <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

                        {/* The V-Shape Flap Shadow (Inside) */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
                    </div>

                    {/* Bottom Flap (Visual) */}
                    <div
                        className="absolute bottom-0 left-0 w-full h-[50%] bg-[#f5f2eb] rounded-b-lg border-t border-gray-300 z-20 shadow-sm"
                        style={{ clipPath: "polygon(0% 0%, 50% 100%, 100% 0%, 100% 100%, 0% 100%)" }} // Triangle cut illusion
                    />
                    {/* Actual Bottom Flap Overlay to hide letter bottom */}
                    <div className="absolute bottom-0 left-0 w-full h-full z-20 pointer-events-none">
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-[#f2efe9] drop-shadow-md">
                            <path d="M0,100 L50,55 L100,100 Z" />
                            <path d="M0,0 L0,100 L50,55 Z" fill="#f8f6f1" /> {/* Left Wing */}
                            <path d="M100,0 L100,100 L50,55 Z" fill="#f8f6f1" /> {/* Right Wing */}
                        </svg>
                    </div>

                    {/* Top Flap (The one that opens) */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-[55%] origin-top z-30"
                        initial={{ rotateX: 0 }}
                        animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
                        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
                    >
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full drop-shadow-xl">
                            <path d="M0,0 L50,80 L100,0 Z" fill="#ffffff" stroke="#e5e5e5" strokeWidth="0.5" />
                        </svg>
                    </motion.div>

                    {/* --- THE RIBBON (Interactive Trigger) --- */}
                    <AnimatePresence>
                        {!isOpen && (
                            <motion.button
                                onClick={() => setIsOpen(true)}
                                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 z-50 flex items-center justify-center cursor-pointer group"
                            >
                                {/* Horizontal Band */}
                                <div className="absolute w-full h-12 bg-rose-500/20 group-hover:bg-rose-500/30 transition-colors backdrop-blur-sm" />

                                {/* Vertical Band */}
                                <div className="absolute h-full w-12 bg-rose-500/20 group-hover:bg-rose-500/30 transition-colors backdrop-blur-sm" />

                                {/* The Knot / Bow (Center) */}
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="relative z-50 bg-rose-600 w-16 h-16 rounded-full shadow-[0_5px_15px_rgba(225,29,72,0.4)] flex items-center justify-center border-2 border-rose-400"
                                >
                                    <Sparkles className="text-white w-8 h-8 animate-pulse" />
                                </motion.div>

                                <div className="absolute mt-24 text-rose-900/60 font-mono text-xs tracking-widest uppercase">
                                    Click to Unravel
                                </div>
                            </motion.button>
                        )}
                    </AnimatePresence>

                </motion.div>

                {/* --- THE LETTER (Slides Right) --- */}
                <motion.div
                    className="absolute z-10 w-[320px] md:w-[450px] h-[400px] md:h-[500px] bg-[#fffefc] rounded-sm shadow-2xl p-8 md:p-12 flex flex-col"
                    initial={{ x: 0, rotate: 0, opacity: 0 }}
                    animate={isOpen ? { x: 200, rotate: 2, opacity: 1 } : { x: 0, rotate: 0, opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 }} // Delays until envelope moves
                >
                    {/* Paper Texture */}
                    <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

                    {/* Letter Content */}
                    <div className="relative z-10 font-mono text-sm md:text-base leading-relaxed overflow-y-auto custom-scrollbar" style={{ fontFamily: "'Courier Prime', monospace" }}>
                        {LETTER_CONTENT}
                    </div>

                    {/* Decor: Red Wax Seal on Letter */}
                    <div className="absolute bottom-6 right-6 w-12 h-12 bg-rose-800 rounded-full opacity-80 shadow-inner flex items-center justify-center">
                        <div className="w-8 h-8 border border-rose-900/50 rounded-full" />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
