"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export default function NicknameScreen() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-20%" });
    const [phase, setPhase] = useState<"idle" | "explode" | "sun" | "reveal">("idle");
    const particles = useRef<any[]>([]);
    const animFrame = useRef<number>(0);

    // Trigger animation sequence when section scrolls into view
    useEffect(() => {
        if (!isInView) return;

        // Phase 1: Explosion
        setPhase("explode");
        createExplosion();

        // Phase 2: Sun emerges
        const sunTimer = setTimeout(() => setPhase("sun"), 800);

        // Phase 3: Full reveal with photo
        const revealTimer = setTimeout(() => setPhase("reveal"), 2000);

        return () => {
            clearTimeout(sunTimer);
            clearTimeout(revealTimer);
            cancelAnimationFrame(animFrame.current);
        };
    }, [isInView]);

    // --- PARTICLE EXPLOSION ---
    const createExplosion = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Spawn golden/warm particles
        for (let i = 0; i < 200; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 12 + 3;
            particles.current.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                size: Math.random() * 4 + 1,
                color: Math.random() > 0.5
                    ? `rgba(251, 191, 36, ${Math.random() * 0.8 + 0.2})`  // Gold
                    : Math.random() > 0.5
                        ? `rgba(253, 224, 71, ${Math.random() * 0.8 + 0.2})`  // Yellow
                        : `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`, // White
                life: 1.0,
                decay: Math.random() * 0.008 + 0.003,
                gravity: 0.02,
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
            p.vy += p.gravity;
            p.vx *= 0.97;
            p.vy *= 0.97;
            p.life -= p.decay;

            if (p.life > 0) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 15;
                ctx.shadowColor = p.color;
                ctx.fill();
            } else {
                particles.current.splice(index, 1);
            }
        });

        if (particles.current.length > 0) {
            animFrame.current = requestAnimationFrame(animateParticles);
        }
    };

    const isActive = phase !== "idle";
    const isSun = phase === "sun" || phase === "reveal";
    const isRevealed = phase === "reveal";

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-30 pointer-events-none"
            />

            {/* Dark base */}
            <div className="absolute inset-0 bg-black z-0" />

            {/* Sun Glow - expands from center */}
            <motion.div
                className="absolute z-10 rounded-full pointer-events-none"
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={isSun ? {
                    width: "200vmax",
                    height: "200vmax",
                    opacity: 1,
                } : {}}
                transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    background: "radial-gradient(circle, rgba(253,224,71,0.3) 0%, rgba(251,191,36,0.15) 25%, rgba(234,88,12,0.08) 50%, transparent 70%)",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            {/* Sun Core - bright center */}
            <motion.div
                className="absolute z-10 rounded-full pointer-events-none"
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={isSun ? {
                    width: "40vmin",
                    height: "40vmin",
                    opacity: 0.8,
                } : {}}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(253,224,71,0.6) 30%, rgba(251,191,36,0.3) 60%, transparent 100%)",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    filter: "blur(20px)",
                }}
            />

            {/* Sun Rays */}
            {isSun && (
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 0.15, scaleY: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 + i * 0.05, ease: "easeOut" }}
                            style={{
                                left: "50%",
                                top: "50%",
                                width: "2px",
                                height: "120vh",
                                background: "linear-gradient(to bottom, rgba(253,224,71,0.8), transparent)",
                                transformOrigin: "top center",
                                transform: `translate(-50%, 0) rotate(${i * 30}deg)`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Floating light particles */}
            {isRevealed && (
                <div className="absolute inset-0 z-20 pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-amber-300/60"
                            style={{
                                width: Math.random() * 4 + 2 + "px",
                                height: Math.random() * 4 + 2 + "px",
                                left: Math.random() * 100 + "%",
                                top: Math.random() * 100 + "%",
                                boxShadow: "0 0 8px rgba(253,224,71,0.6)",
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0, 0.8, 0],
                                scale: [0, 1.5, 0],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Her Photo - rises from the sun */}
            <motion.div
                className="relative z-20"
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={isRevealed ? {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                } : {}}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
                <div className="relative w-64 h-80 md:w-80 md:h-[28rem] rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(251,191,36,0.4)]">
                    <img
                        src="/memories/Memories-1.jpg"
                        alt="Omalicha nwa"
                        className="w-full h-full object-cover"
                    />
                    {/* Warm overlay blend */}
                    <div
                        className="absolute inset-0 mix-blend-soft-light"
                        style={{
                            background: "radial-gradient(circle at center, rgba(253,224,71,0.4) 0%, rgba(251,191,36,0.2) 40%, transparent 70%)",
                        }}
                    />
                    {/* Edge glow */}
                    <div
                        className="absolute inset-0"
                        style={{
                            boxShadow: "inset 0 0 60px rgba(251,191,36,0.3)",
                        }}
                    />
                </div>
            </motion.div>

            {/* Nickname Text */}
            <motion.div
                className="relative z-20 text-center mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 1 }}
            >
                <h2
                    className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-3 drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                    Omalicha nwa
                </h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isRevealed ? { opacity: 0.6 } : {}}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="text-amber-200/60 font-mono text-sm md:text-base tracking-[0.3em] uppercase"
                >
                    &quot;The light that shines&quot;
                </motion.p>
            </motion.div>

            {/* Ambient warmth overlay for entire section */}
            <motion.div
                className="absolute inset-0 z-[5] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={isSun ? { opacity: 1 } : {}}
                transition={{ duration: 2 }}
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.08) 0%, transparent 60%)",
                }}
            />
        </section>
    );
}
