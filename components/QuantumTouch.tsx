"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint } from "lucide-react";
import gsap from "gsap";
import CameraKissModal from "@/components/CameraKissModal";

// Particle Interface
interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    life: number;
}

export default function QuantumTouch() {
    const [status, setStatus] = useState<"idle" | "charging" | "complete">("idle");
    const [charge, setCharge] = useState(0); // For UI
    const chargeRef = useRef(0); // For Animation Loop (Latest value)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const particles = useRef<Particle[]>([]);
    const animationFrame = useRef<number>(0);
    const isHolding = useRef(false);
    const [showTicket, setShowTicket] = useState(false); // Finale State

    // --- STATE FOR FLIP CARDS ---
    const [selectedCard, setSelectedCard] = useState<"cinema" | "car" | null>(null);

    // --- STATE FOR CAMERA MODAL ---
    const [showCamera, setShowCamera] = useState(false);
    const [cameraCardTitle, setCameraCardTitle] = useState("");
    const [cameraCardIcon, setCameraCardIcon] = useState("");

    // --- CONFIGURATION ---
    const CHARGE_SPEED = 0.5; // How fast it charges per frame
    const DECAY_SPEED = 1.0;  // How fast it drains when released

    // Initialize Particles & Animation Loop
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize Canvas
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Spawn Initial Ambient Particles
        if (particles.current.length === 0) {
            for (let i = 0; i < 200; i++) {
                particles.current.push(createParticle(canvas));
            }
        }

        const loop = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update Charge Logic
            if (status !== "complete") {
                if (isHolding.current) {
                    const newCharge = Math.min(chargeRef.current + CHARGE_SPEED, 100);
                    chargeRef.current = newCharge;
                    setCharge(newCharge); // Sync UI
                } else {
                    const newCharge = Math.max(chargeRef.current - DECAY_SPEED, 0);
                    chargeRef.current = newCharge;
                    setCharge(newCharge); // Sync UI
                }
            }

            // Check for Completion
            if (chargeRef.current >= 100 && status !== "complete") {
                completeSequence();
            }

            // Render Particles
            particles.current.forEach((p, i) => {
                updateParticle(p, canvas.width, canvas.height, isHolding.current, chargeRef.current);
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Respawn if dead
                if (p.life <= 0) {
                    particles.current[i] = createParticle(canvas);
                }
            });

            animationFrame.current = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrame.current);
        };
    }, [status]); // Only restart if status changes (e.g. to complete), NOT on charge update

    const createParticle = (canvas: HTMLCanvasElement): Particle => {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1, // Tiny dots
            color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`, // White/Transparent
            life: Math.random() * 100 + 100,
        };
    };

    const updateParticle = (p: Particle, w: number, h: number, attracting: boolean, currentCharge: number) => {
        const centerX = w / 2;
        const centerY = h / 2;

        if (attracting) {
            // physics: suck towards center
            const dx = centerX - p.x;
            const dy = centerY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // The closer to 100 charge, the stronger the pull and chaotic energy
            const force = (currentCharge / 100) * 0.15 + 0.02;

            p.vx += dx * 0.0005 * force;
            p.vy += dy * 0.0005 * force; // Orbit/Suction feel

            // Color Shift: Blue -> Pink -> Red/Gold as charge increases
            if (currentCharge > 80) p.color = `rgba(251, 191, 36, 0.8)`; // Gold
            else if (currentCharge > 50) p.color = `rgba(244, 63, 94, 0.6)`; // Pink/Rose
            else p.color = `rgba(147, 197, 253, 0.5)`; // Blueish

        } else {
            // Idle drift
            p.x += p.vx;
            p.y += p.vy;

            // If life is infinite (99999), apply twinkle effect
            if (p.life > 90000) {
                // Twinkle: Randomly change opacity/size slightly
                if (Math.random() > 0.9) {
                    p.size = Math.random() * 3 + 1;
                }
            } else {
                p.life--;
            }
        }

        // Apply Velocity
        p.x += p.vx;
        p.y += p.vy;

        // Friction/Damping logic would go here if needed, but simple is fine
        p.vx *= 0.99;
        p.vy *= 0.99;
    };

    const handleTouchStart = () => {
        if (status === "complete") return;
        isHolding.current = true;
        setStatus("charging");
        // Haptic feedback?
        if (navigator.vibrate) navigator.vibrate(50);
    };

    const handleTouchEnd = () => {
        if (status === "complete") return;
        isHolding.current = false;
        setStatus("idle");
    };

    const completeSequence = () => {
        setStatus("complete");
        isHolding.current = false;
        // Animation handled in render
    };

    const handleExplosionSequence = () => {
        if (!canvasRef.current || !containerRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // 1. IMPLOSION: Suck all particles to center FAST
        // We modify the particles array directly
        particles.current.forEach(p => {
            // Force velocity towards center
            const dx = (canvas.width / 2) - p.x;
            const dy = (canvas.height / 2) - p.y;
            p.vx = dx * 0.1;
            p.vy = dy * 0.1;
            p.life = 100;
            p.color = "white";
        });

        // 2. FLASH & EXPLOSION
        setTimeout(() => {
            gsap.to(containerRef.current, {
                backgroundColor: "#fff", // Bright white flash
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    setShowTicket(true); // Trigger Ticket Reveal

                    // Explosion: Send particles flying OUT
                    particles.current.forEach(p => {
                        p.x = canvas.width / 2;
                        p.y = canvas.height / 2;
                        p.vx = (Math.random() - 0.5) * 50; // FAST
                        p.vy = (Math.random() - 0.5) * 50;
                        p.color = Math.random() > 0.5 ? "rgba(244, 63, 94, 0.8)" : "rgba(251, 191, 36, 0.8)"; // Pink & Gold
                        p.life = 200;
                        p.size = Math.random() * 4 + 2;
                    });

                    // 3. SPAWN PERMANENT GLITTER
                    // Add 100 new "Sparkle" particles that just twinkle
                    for (let i = 0; i < 150; i++) {
                        particles.current.push({
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height,
                            vx: (Math.random() - 0.5) * 0.5,
                            vy: (Math.random() - 0.5) * 0.5,
                            size: Math.random() * 3,
                            color: Math.random() > 0.5 ? "rgba(255, 215, 0, 0.8)" : "rgba(255, 255, 255, 0.8)", // Gold & White
                            life: 99999, // Live forever
                        });
                    }
                }
            });
        }, 600); // Wait for implosion to hit center
    };

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden touch-none select-none"
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Canvas for Particles */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* --- SCANNER INTERFACE --- */}
            <AnimatePresence>
                {status !== "complete" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        {/* Fingerprint Icon Container */}
                        <div className="relative mb-8 group cursor-pointer">
                            {/* Pulse Rings */}
                            {isHolding.current && (
                                <>
                                    <motion.div
                                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="absolute inset-0 rounded-full border border-rose-500/50"
                                    />
                                    <motion.div
                                        animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                                        transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
                                        className="absolute inset-0 rounded-full border border-rose-500/30"
                                    />
                                </>
                            )}

                            {/* Main Icon */}
                            <Fingerprint
                                size={80}
                                className={`transition-colors duration-300 ${isHolding.current ? "text-rose-500" : "text-white/20 animate-pulse"}`}
                            />
                        </div>

                        {/* Text Instruction */}
                        <div className="text-center h-12">
                            <p className={`text-xs tracking-[0.3em] uppercase transition-all duration-300 ${isHolding.current ? "text-rose-400 font-bold" : "text-white/30"}`}>
                                {isHolding.current ? "HOLD TO SYNC..." : "INITIATE CONNECTION"}
                            </p>
                            {/* Charge Bar (Optional Visual) */}
                            {isHolding.current && (
                                <div className="w-32 h-1 bg-white/10 mt-4 rounded-full overflow-hidden mx-auto">
                                    <div
                                        className="h-full bg-rose-500 transition-all duration-75 ease-linear"
                                        style={{ width: `${charge}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- THE REVEAL (Post-Explosion) --- */}
            {status === "complete" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none"
                >
                    {/* 1. THE ACTION BUTTON (YES) - Fades out after click */}
                    <AnimatePresence>
                        {!showTicket && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0, filter: "blur(20px)" }}
                                transition={{ duration: 0.5 }}
                                className="text-center flex flex-col items-center gap-6 px-4 pointer-events-auto"
                            >
                                <motion.h2
                                    className="text-white/60 text-sm md:text-base tracking-[0.4em] uppercase font-light mb-4"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    Connection Established
                                </motion.h2>

                                <h1 className="text-5xl md:text-7xl text-white font-serif tracking-tight drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]">
                                    Will You Be<br />My Valentine?
                                </h1>

                                <div className="flex gap-6 mt-12">
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(244,63,94,0.6)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-10 py-4 bg-rose-600 text-white font-bold tracking-widest uppercase text-sm rounded-full shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                                        onClick={handleExplosionSequence}
                                    >
                                        Yes, Forever
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 2. MESSY FLIP CARDS (Reveals after explosion) */}
                    {showTicket && (
                        <div className="relative w-full h-screen flex items-center justify-center pointer-events-auto overflow-hidden">

                            {/* Overlay to deselect */}
                            <div
                                className={`absolute inset-0 bg-black/80 transition-opacity duration-500 ${selectedCard ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                                onClick={() => setSelectedCard(null)}
                            />

                            <h2 className={`absolute top-24 md:top-32 text-white/60 text-sm md:text-xl tracking-[0.3em] uppercase font-light text-center transition-opacity duration-500 z-0 ${selectedCard ? "opacity-0" : "opacity-100 delay-1000"}`}>
                                Choose Your Adventure
                            </h2>

                            {/* --- CARD 1: STARLIGHT CINEMA --- */}
                            <FlipCard
                                id="cinema"
                                isSelected={selectedCard === "cinema"}
                                isOtherSelected={selectedCard !== null && selectedCard !== "cinema"}
                                onClick={() => setSelectedCard(selectedCard === "cinema" ? null : "cinema")}
                                initialRotation={-6}
                                initialX={-140}
                                color="from-indigo-900 to-black"
                                borderColor="border-indigo-500/50"
                                icon="🌜"
                                title="Starlight Cinema"
                                subtitle="Movie in the Park"
                                details={{
                                    time: "8:00 PM",
                                    location: "Centennial Park",
                                    note: "Outdoors with people. Blankets, natural breeze, drinks, and chow."
                                }}
                                onClaim={() => {
                                    setCameraCardTitle("Starlight Cinema");
                                    setCameraCardIcon("🌜");
                                    setShowCamera(true);
                                }}
                            />

                            {/* --- CARD 2: IN THE GLOW OF YOU --- */}
                            <FlipCard
                                id="car"
                                isSelected={selectedCard === "car"}
                                isOtherSelected={selectedCard !== null && selectedCard !== "car"}
                                onClick={() => setSelectedCard(selectedCard === "car" ? null : "car")}
                                initialRotation={8}
                                initialX={140}
                                color="from-rose-950 to-black"
                                borderColor="border-rose-500/50"
                                icon="🕯️"
                                title="In the Glow of You"
                                subtitle="Dinner Date at Brisk"
                                details={{
                                    time: "8:00 PM",
                                    location: "Brisk",
                                    note: "Dress up. Dine well. Stare at each other across the table."
                                }}
                                onClaim={() => {
                                    setCameraCardTitle("In the Glow of You");
                                    setCameraCardIcon("🕯️");
                                    setShowCamera(true);
                                }}
                            />

                        </div>
                    )}
                </motion.div>
            )}

            {/* --- CAMERA KISS MODAL --- */}
            <CameraKissModal
                isOpen={showCamera}
                onClose={() => setShowCamera(false)}
                cardTitle={cameraCardTitle}
                cardIcon={cameraCardIcon}
            />
        </section>
    );
}

// --- FLIP CARD COMPONENT ---

interface FlipCardProps {
    id: string;
    isSelected: boolean;
    isOtherSelected: boolean;
    onClick: () => void;
    initialRotation: number;
    initialX: number;
    color: string;
    borderColor: string;
    icon: string;
    title: string;
    subtitle: string;
    details: { time: string; location: string; note: string };
    onClaim: () => void;
}

function FlipCard({
    isSelected,
    isOtherSelected,
    onClick,
    initialRotation,
    initialX,
    color,
    borderColor,
    icon,
    title,
    subtitle,
    details,
    onClaim
}: FlipCardProps) {

    return (
        <div
            className={`absolute transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isSelected ? "z-50" : "z-10"}`}
            style={{
                perspective: "1000px",
                transform: isSelected
                    ? "translate(0, 0) rotate(0deg)" // Center
                    : isOtherSelected
                        ? `translate(${initialX * 3}px, 1000px) rotate(${initialRotation}deg)` // Fly away
                        : `translate(${initialX}px, 0) rotate(${initialRotation}deg)` // Messy pile
            }}
            onClick={(e) => {
                e.stopPropagation();
                onClick(); // Trigger Flip
            }}
        >
            <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: isSelected ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-[300px] h-[450px] transform-style-3d cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* --- FRONT SIDE --- */}
                <div
                    className={`absolute inset-0 w-full h-full bg-gradient-to-br ${color} border ${borderColor} backdrop-blur-md rounded-3xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden`}
                    style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
                >
                    {/* Texture */}
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                    <div className="absolute top-2 right-4 text-white/20 text-4xl font-serif italic">"{icon}"</div>

                    <div className="mt-12 z-10">
                        <p className="text-xs text-white/50 tracking-[0.3em] uppercase mb-2">Admit One</p>
                        <h2 className="text-4xl text-white font-serif italic leading-tight">{title}</h2>
                    </div>

                    <div className="z-10">
                        <div className="w-full h-[1px] bg-white/20 mb-4" />
                        <p className="text-white/80 text-sm font-light uppercase tracking-widest">{subtitle}</p>
                    </div>

                    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/10 blur-3xl rounded-full pointer-events-none" />
                </div>

                {/* --- BACK SIDE (DETAILS) --- */}
                <div
                    className={`absolute inset-0 w-full h-full bg-black/90 border ${borderColor} rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center text-center`}
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", transformStyle: "preserve-3d" }}
                >
                    <div className="mb-6">
                        <span className="text-4xl">{icon}</span>
                    </div>

                    <h3 className="text-xl text-white font-serif mb-6">{title}</h3>

                    <div className="space-y-4 w-full text-sm text-white/70 font-light mb-8">
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span>Time</span>
                            <span className="text-white">{details.time}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span>Location</span>
                            <span className="text-white">{details.location}</span>
                        </div>
                        <p className="text-xs italic text-white/50 pt-2 leading-relaxed">
                            "{details.note}"
                        </p>
                    </div>

                    {/* CLAIM BUTTON - Opens Camera Modal */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClaim();
                        }}
                        className="w-full py-4 bg-white text-black font-bold tracking-[0.2em] uppercase text-xs rounded-full hover:bg-rose-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        Claim Date
                    </button>

                    <p className="mt-4 text-[10px] text-white/30 uppercase tracking-widest">Tap outside to close</p>
                </div>
            </motion.div>
        </div>
    );
}
