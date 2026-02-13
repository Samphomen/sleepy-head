"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FlankingBanners() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-0">

            {/* --- LEFT FLANK (The Panda) --- */}
            <motion.div
                initial={{ x: -100, opacity: 0, rotate: -5 }}
                whileInView={{ x: 0, opacity: 1, rotate: 3 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} // "Buttery" (Bezier for easeOutQuart-ish)
                style={{ willChange: "transform, opacity" }}
                className="absolute left-[-5%] md:left-0 top-[10%] md:top-auto h-[50vh] md:h-[80vh] w-[40vw] md:w-[25vw] z-10 hidden md:block"
            >
                <motion.div
                    animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full relative transform -skew-y-3 hover:skew-y-0 transition-transform duration-700 ease-out"
                >
                    <img
                        src="/memories/Memories-3.jpg"
                        alt="Panda Memory"
                        className="w-full h-full object-cover rounded-tr-[50px] rounded-bl-[50px] opacity-80 hover:opacity-100 transition-opacity duration-500 shadow-2xl"
                    />
                    {/* Tape/Sticker Effect */}
                    <div className="absolute -top-10 left-10 w-20 h-40 bg-white/10 blur-xl rotate-45" />
                </motion.div>
            </motion.div>

            {/* --- MOBILE LEFT FLANK --- */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="md:hidden absolute -left-10 top-20 w-40 h-60 opacity-40 rotate-12 z-0 pointer-events-none"
            >
                <img src="/memories/Memories-3.jpg" alt="Panda decoration" className="w-full h-full object-cover rounded-lg" />
            </motion.div>

            {/* --- CENTER CONTENT (The "Testimonial" / Love Note) --- */}
            <div className="relative z-20 max-w-2xl px-8 text-center flex flex-col items-center gap-8">

                {/* 5-Star Rating */}
                <div className="flex gap-2 text-[#facc15] drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                    {[...Array(5)].map((_, i) => (
                        <motion.svg
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 200, damping: 10 }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 md:w-8 md:h-8"
                        >
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </motion.svg>
                    ))}
                </div>

                {/* Location / Date / Context */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                    className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-white/50"
                >
                    Since Day One • Forever
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                    className="text-base md:text-lg font-serif leading-relaxed text-white/90 whitespace-pre-line"
                    style={{ fontFamily: "'Bodoni Moda', serif", willChange: "transform, opacity, filter" }}
                >
                    &quot;Every moment with you feels good in a quiet way. Not because we're doing anything grand, but simply because it's you, baby.

                    I find myself craving more time in your presence, not to fill the hours, but to collect little moments of you. Your smile when it catches me off guard. Your laugh, the one that makes everything else fade away. The way your eyes soften when you look at me. And your scent... god, the way you smell. It's intoxicating, that subtle fragrance that's just you, the one I'd recognize anywhere, the one that lingers with me long after you've gone.

                    The way you sit close. How your presence alone feels like coming home.

                    Even the simplest times stay with me, our random conversations, your capon jokes, you playfully begging me to appreciate your subtle humor. And the way we turn those moments into something charged, something deliciously ours, with inside jokes that make us laugh like no one else is listening. That rawness, that freedom to be completely unfiltered together... that's intimacy.

                    Every hour we've spent together has felt effortless and real, even if they're never quite enough. And that realness, that ease with you... it means more to me than words can capture&quot;
                </motion.div>

            </div>

            {/* --- RIGHT FLANK (The Character) --- */}
            <motion.div
                initial={{ x: 100, opacity: 0, rotate: 5 }}
                whileInView={{ x: 0, opacity: 1, rotate: -3 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: "transform, opacity" }}
                className="absolute right-[-5%] md:right-0 bottom-[10%] md:bottom-auto h-[50vh] md:h-[80vh] w-[40vw] md:w-[25vw] z-10 hidden md:block"
            >
                <motion.div
                    animate={{ y: [0, -15, 0], rotate: [0, -2, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} // Slight offset from left
                    className="w-full h-full relative transform skew-y-3 hover:skew-y-0 transition-transform duration-700 ease-out"
                >
                    <img
                        src="/memories/Memories-4.jpg"
                        alt="Character Memory"
                        className="w-full h-full object-cover rounded-tl-[50px] rounded-br-[50px] opacity-80 hover:opacity-100 transition-opacity duration-500 shadow-2xl"
                    />
                    {/* Tape/Sticker Effect */}
                    <div className="absolute -bottom-10 right-10 w-20 h-40 bg-white/10 blur-xl -rotate-45" />
                </motion.div>
            </motion.div>

            {/* --- MOBILE RIGHT FLANK --- */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="md:hidden absolute -right-10 bottom-20 w-40 h-60 opacity-40 -rotate-12 z-0 pointer-events-none"
            >
                <img src="/memories/Memories-4.jpg" alt="Character decoration" className="w-full h-full object-cover rounded-lg" />
            </motion.div>

        </section>
    );
}
