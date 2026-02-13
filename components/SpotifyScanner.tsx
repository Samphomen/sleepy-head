"use client";

import React from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";

export default function SpotifyScanner() {
    return (
        <section className="relative w-full py-20 bg-black flex flex-col items-center justify-center overflow-hidden">

            {/* --- Background Glow --- */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-black to-black pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-10 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col items-center gap-6 max-w-sm mx-4"
            >
                {/* Header */}
                <div className="flex items-center gap-3 text-green-400">
                    <Music size={24} />
                    <span className="text-sm font-bold tracking-widest uppercase">Our Soundtrack</span>
                </div>

                {/* Spotify Code Image Placeholder */}
                {/* USER: Replace this src with your actual Spotify Code image URL */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-lg group-hover:bg-green-500/40 transition-colors duration-500" />
                    <img
                        src="https://scannables.scdn.co/uri/plain/png/000000/white/640/spotify:album:3lajefIuUk4SfzqVBSJy8p"
                        alt="Scan on Spotify"
                        className="relative w-64 h-auto rounded-lg shadow-lg"
                    />
                </div>

                {/* Instruction */}
                <div className="text-center">
                    <h3 className="text-white font-serif text-xl mb-2">Scan to Listen</h3>
                    <p className="text-white/40 text-xs">Open Spotify &gt; Search &gt; Camera</p>
                </div>

            </motion.div>

        </section>
    );
}
