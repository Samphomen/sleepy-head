"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// Define Messages
const MESSAGES = [
    {
        id: 1,
        segments: [
            "I meant to tell you this in person, but my ADHD mind keeps telling me we might not get that quiet moment before the year fully kicks off — so here it goes.\n\nI’ve really enjoyed getting to know you, and I love how calm things feel with you.",
            "I like how I feel when I’m with you, and how you stay on my mind even when you’re not around — especially the time we spend together.\n\nI’m sure it’s probably obvious that I like you. I love how being with you feels, and I don’t want to be casual about that — or about how I feel about you.",
            "I really miss you when we’re not together, and that’s how I know I feel something real. Falling for you has been the easiest thing for me to do. From the first day I saw at the front desk, I knew — I even told Jeff I was going to step to you. And going into 2026, I’m not afraid of how I feel.",
            "It always feels like we don’t have enough time and I would I honestly would exchange all the resting good the few hours we spend together.\n\nI love hearing you talk and seeing you smile. And everything about you.\n\nAnd I know this is not what you might be feeling at this time but I just had to voice mine"
        ],
        delay: 0.2,
        baseRotation: -3,
        yOffset: "mt-12"
    },
    {
        id: 2,
        segments: [
            "I know I haven’t said this enough Times, and I really can’t help it. You really are my favorite person to talk to, and just the thought of you makes my whole day feel lighter. And sometimes I hate that you’re feeling so buried under work right now.",
            "But when I say ‘Mixxy you amaze me’ best believe I don’t say it lightly. It’s obvious you’re meant for such big, beautiful things, and I see how hard you’re pushing, even when it feels like the work never ends.",
            "I care about you more than I can put into words, I’m actually a shy guy so I don’t talk much 🤭. You've got me and if there’s even a tiny way I can make your amazing life even a little easier or just hold you while you vent, I’m always, always here for you.❤️❤️"
        ],
        delay: 0.4,
        baseRotation: 2,
        yOffset: "-mt-8"
    },
    {
        id: 3,
        segments: [
            "I dream of you everyday, I dream of being with you",
            "But then I start feeling something. A funny taste like beef. So I wake up and I find out I have been eating meat pie",
            "YOUR BODY NA MEAT PIE\n😅😅😂❤️❤️❤️❤️❤️❤️❤️❤️❤️"
        ],
        delay: 0.6,
        baseRotation: -2,
        yOffset: "mt-16"
    },
    {
        id: 4,
        segments: [
            "My baby you’re gonna do amazing.\n\nGod’s got you. Your nerves are calm and you have clarity and confidence, everything flows smoothly as you moderate the panel. You’re prepared, you’re capable, and you’re going to do great babe.\n\nAnd honestly I’m proud of you ❤️❤️❤️\n\nAnd hopefully you’ll allow me brag about you in the future"
        ],
        delay: 0.8,
        baseRotation: 1,
        yOffset: "mt-8" // Adds the requested space
    }
];

// Define Visual Columns
// Column 1: Msg 1
// Column 2: Msg 2
// Column 3: Msg 3 AND Msg 4 (Stacked)
const COLUMNS = [
    [MESSAGES[0]], // Col 1
    [MESSAGES[1]], // Col 2
    [MESSAGES[2], MESSAGES[3]] // Col 3
];

// Simple Heart Doodle Component
const HeartDoodle = ({ delay, x, y, rotate, scale }: { delay: number, x: string, y: string, rotate: number, scale: number }) => (
    <motion.svg
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [scale, scale * 1.1, scale],
            y: [0, -20, 0]
        }}
        transition={{
            duration: 8,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
        className={`absolute ${x} ${y} z-0 pointer-events-none text-white/10`}
        style={{ rotate: rotate }}
        width="100" height="100" viewBox="0 0 24 24" fill="currentColor"
    >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </motion.svg>
);

export default function ChatFloating() {
    const [activeId, setActiveId] = useState<number | null>(null);

    return (
        <section id="chat-floating" className="relative w-full min-h-screen bg-[#0b141a] flex flex-col items-center justify-center py-20 px-4 md:px-10 overflow-hidden">

            {/* --- WHATSAPP BACKGROUND PATTERN --- */}
            <div className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
                    backgroundSize: "400px"
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10" />

            {/* --- FLOATING DOODLES (Hearts) --- */}
            <HeartDoodle x="top-20" y="left-10" rotate={-15} scale={1} delay={0} />
            <HeartDoodle x="top-40" y="right-20" rotate={12} scale={1.5} delay={2} />
            <HeartDoodle x="bottom-32" y="left-[15%]" rotate={-5} scale={0.8} delay={4} />
            <HeartDoodle x="bottom-20" y="right-[10%]" rotate={15} scale={1.2} delay={1} />
            <HeartDoodle x="top-1/2" y="left-1/2" rotate={0} scale={2} delay={5} />


            {/* --- INSTRUCTION TEXT --- */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-20 mb-16 text-center"
            >
                <h3 className="text-white/40 font-mono text-xs tracking-[0.3em] uppercase mb-2">Messages That Made You Smile</h3>
                <p className="text-white/20 text-sm">Tap a group to read</p>
            </motion.div>


            {/* --- SIDE-BY-SIDE GROUPS (Now Columns) --- */}
            <div className="relative z-20 w-full max-w-7xl flex flex-col md:flex-row items-start justify-center gap-8 md:gap-12 px-4">

                {COLUMNS.map((columnMessages, colIndex) => (
                    <div key={colIndex} className="relative w-full md:w-1/3 flex flex-col gap-8 md:gap-12">
                        {columnMessages.map((msg) => {
                            const isActive = activeId === msg.id;
                            return (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.8, delay: msg.delay, ease: "easeOut" }}
                                    className={`relative w-full flex flex-col gap-3 ${msg.yOffset} cursor-pointer group transition-all duration-500`}
                                    onClick={() => setActiveId(isActive ? null : msg.id)}
                                    style={{ rotate: msg.baseRotation, willChange: "transform" }}
                                >
                                    {/* Render Segments */}
                                    {msg.segments.map((segment, i) => {
                                        const segmentRotation = (i % 2 === 0 ? 1 : -1) * (Math.random() * 2 + 1);
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ x: (i % 2 === 0 ? -5 : 5), rotate: segmentRotation }}
                                                animate={{
                                                    scale: isActive ? 1.02 : 1,
                                                    filter: isActive ? "blur(0px)" : "blur(4px)",
                                                    opacity: isActive ? 1 : 0.7,
                                                    rotate: isActive ? 0 : segmentRotation,
                                                    x: isActive ? 0 : (i % 2 === 0 ? -5 : 5)
                                                }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                                className={`
                                                    bg-[#005c4b] p-5 rounded-xl shadow-lg border border-[#007a63]/30 
                                                    text-[#e9edef] text-sm font-sans leading-relaxed relative
                                                    ${isActive ? 'z-30 ring-1 ring-[#00a884]/50' : 'z-10 hover:bg-[#005c4b]/80'}
                                                `}
                                            >
                                                {/* Tail only on last segment */}
                                                {i === msg.segments.length - 1 && (
                                                    <div className="absolute bottom-0 -right-[8px] w-0 h-0 border-[8px] border-transparent border-b-[#005c4b] border-l-[#005c4b]" />
                                                )}

                                                <p className="whitespace-pre-line">{segment}</p>

                                                {/* Timestamp on last segment */}
                                                {i === msg.segments.length - 1 && (
                                                    <div className="flex justify-end items-center gap-1 mt-2 opacity-60">
                                                        <span className="text-[10px] text-white/80">Read</span>
                                                        <svg viewBox="0 0 16 15" width="12" height="11" className="fill-[#53bdeb]">
                                                            <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-7.655a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-7.655a.365.365 0 0 0-.063-.51z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            );
                        })}
                    </div>
                ))}

            </div>

        </section>
    );
}
