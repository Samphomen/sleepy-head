"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LoveLetter() {
    return (
        <section className="relative min-h-screen w-full bg-[#fdfbf7] flex items-center justify-center py-20 overflow-hidden">

            {/* Paper Texture Overlay */}
            <div
                className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
            />

            {/* The Letter Container */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative w-full max-w-2xl bg-[#fffefc] shadow-2xl p-10 md:p-16 rotate-1"
            >
                {/* Paper Fold Lines/Creases (CSS Trick) */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/5 via-transparent to-black/5 pointer-events-none" />

                {/* Date Stamp */}
                <div className="text-right font-mono text-sm text-gray-400 mb-8 tracking-widest uppercase">
                    February 14, 2026
                </div>

                {/* Salutation */}
                <h2 className="text-2xl font-serif text-gray-800 mb-6 font-bold">
                    My Dearest,
                </h2>

                {/* Body Text - Typewriter Style */}
                <div className="space-y-6 font-mono text-gray-700 leading-relaxed text-lg" style={{ fontFamily: "'Courier Prime', monospace" }}>
                    <p>
                        I’ve been trying to find the perfect way to tell you how much you mean to me.
                        Words often fall short, but I wanted to write this down so you could keep it forever.
                    </p>
                    <p>
                        From the moment we met, my world shifted. Colors became brighter, laughter became louder,
                        and everything just made sense. You are the missing piece I didn’t know I was looking for.
                    </p>
                    <p>
                        Thank you for being my best friend, my partner in crime, and my greatest adventure.
                        Here’s to a lifetime of memories, just like the ones we’ve made so far.
                    </p>
                </div>

                {/* Closing */}
                <div className="mt-12 text-right">
                    <p className="font-serif italic text-xl text-gray-600 mb-4">Forever yours,</p>

                    {/* Signature (Handwritten Font Simulation) */}
                    <div className="font-handwriting text-4xl text-rose-600 rotate-[-5deg]" style={{ fontFamily: "'Nothing You Could Do', cursive" }}>
                        The Architect
                    </div>
                </div>

                {/* Red Wax Seal */}
                <div className="absolute bottom-10 left-10 w-16 h-16 bg-red-800 rounded-full flex items-center justify-center shadow-lg border-4 border-red-900/50 opacity-80 backdrop-blur-sm">
                    <div className="text-red-950 font-serif font-bold text-2xl">L</div>
                </div>

            </motion.div>

        </section>
    );
}
