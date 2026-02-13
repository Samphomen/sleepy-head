"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { Lock, ArrowRight } from "lucide-react";

export default function Gate() {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const setIsUnlocked = useStore((state) => state.setIsUnlocked);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<any[]>([]);
    const animationFrame = useRef<number>(0);

    // --- CONFIGURATION ---
    const PASSWORDS = ["obim", "Obim", "OBIM", "love", "Love", "LOVE"];
    const CLUE = "(Hint: It's a 4-letter word)";

    const playSuccessSound = () => {
        const audio = new Audio('/sounds/correct-answer.mp3');
        audio.volume = 0.7;
        audio.play().catch(err => console.log('Audio playback failed:', err));
    };

    // --- PARTICLE SYSTEM ---
    const createExplosion = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Spawn Particles (PINK GLITTER DUST)
        for (let i = 0; i < 300; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 15 + 2; // Fast burst
            particles.current.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                size: Math.random() * 3 + 0.5, // Tiny dust to larger sparkles
                color: Math.random() > 0.6
                    ? `rgba(244, 63, 94, ${Math.random() * 0.5 + 0.5})` // Pink (Rose-500)
                    : Math.random() > 0.5
                        ? `rgba(251, 191, 36, ${Math.random() * 0.5 + 0.5})` // Gold
                        : `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`, // White
                life: 1.0,
                decay: Math.random() * 0.01 + 0.005,
                gravity: 0.05
            });
        }

        animateParticles();
    };

    const animateParticles = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.current.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity; // Slight gravity for dust fall
            p.vx *= 0.95; // Friction
            p.vy *= 0.95;
            p.life -= p.decay;

            // Twinkle Effect
            const flicker = Math.random() > 0.9 ? 0 : 1;

            if (p.life > 0) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life * flicker, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;
                ctx.fill();
            } else {
                particles.current.splice(index, 1);
            }
        });

        if (particles.current.length > 0) {
            animationFrame.current = requestAnimationFrame(animateParticles);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (PASSWORDS.includes(input.trim())) {
            // --- SUCCESS ---
            playSuccessSound();
            setSuccess(true);
            createExplosion(); // TRIGGER THE PINK DUST

            // Transition delay
            setTimeout(() => {
                setIsUnlocked(true);
            }, 2000);
        } else {
            setError(true);
            setTimeout(() => setError(false), 1000);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black overflow-hidden"
            animate={{ opacity: success ? 0 : 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1.0 }} // Wait for explosion, then fade
        >
            {/* Canvas for Particles */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-50 pointer-events-none"
            />

            {/* --- TEXTURES --- */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-950/20 via-black to-black" />
                <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
                    style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
                />
            </div>

            <div className={`relative z-10 w-full max-w-md px-6 transition-opacity duration-500 ${success ? "opacity-0" : "opacity-100"}`}>

                {/* Icon */}
                <div className="flex justify-center mb-8">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                    >
                        <Lock className="w-6 h-6 text-white/60" />
                    </motion.div>
                </div>

                {/* Title */}
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl text-center text-white font-bold mb-2 tracking-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    WHAT'S THE <span className="text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]">MAGIC</span> WORD?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center text-white/40 text-sm mb-10 tracking-widest uppercase font-light"
                >
                    {CLUE}
                </motion.p>

                {/* Input Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="relative z-10 flex flex-col items-center gap-6 w-full max-w-2xl px-4"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setError(false);
                        }}
                        placeholder="Type the magic word..."
                        className={`w-full bg-transparent border-b-2 border-white/20 py-4 text-center text-3xl md:text-5xl text-white placeholder-white/10 outline-none transition-all duration-500 focus:border-rose-500 focus:text-rose-100 focus:drop-shadow-[0_0_25px_rgba(244,63,94,0.6)] font-serif italic ${error ? 'animate-shake text-rose-500 border-rose-500' : ''}`}
                        autoFocus
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    />

                    {/* Submit Arrow */}
                    {input.length > 0 && (
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            type="submit"
                            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white/60 hover:text-white transition-colors"
                        >
                            <ArrowRight size={24} />
                        </motion.button>
                    )}
                </motion.form>

                {/* Error Message */}
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-red-400/80 text-xs mt-6 tracking-widest uppercase"
                    >
                        Access Denied. Try "Obim"
                    </motion.p>
                )}
            </div>
        </motion.div>
    );
}
