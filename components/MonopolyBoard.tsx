"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- TILE CONFIGURATION ---
// Each tile represents a relationship milestone/memory
// Add your own images to public/monopoly/ and update the src paths
const TILES = [
    {
        id: 0,
        name: "GO",
        type: "go" as const,
        color: "bg-rose-500",
        message: "The journey begins...",
        image: "", // Add image path e.g. "/monopoly/go.jpg"
    },
    {
        id: 1,
        name: "First Meeting",
        type: "property" as const,
        color: "bg-purple-500",
        message: "The day everything changed without us knowing.",
        image: "", // Add image path
    },
    {
        id: 2,
        name: "First Conversation",
        type: "property" as const,
        color: "bg-purple-500",
        message: "That first real talk that made time disappear.",
        image: "",
    },
    {
        id: 3,
        name: "Chance",
        type: "chance" as const,
        color: "bg-amber-500",
        message: "Advance to Boyfriend's Arms. Collect unlimited hugs.",
        image: "",
    },
    {
        id: 4,
        name: "Movie Nights",
        type: "property" as const,
        color: "bg-cyan-500",
        message: "Those evenings that made everything feel easy.",
        image: "",
    },
    {
        id: 5,
        name: "First Date",
        type: "property" as const,
        color: "bg-cyan-500",
        message: "The night we stopped pretending this was casual.",
        image: "",
    },
    {
        id: 6,
        name: "Community Chest",
        type: "chest" as const,
        color: "bg-blue-500",
        message: "You won a lifetime supply of forehead kisses.",
        image: "",
    },
    {
        id: 7,
        name: "First Kiss",
        type: "property" as const,
        color: "bg-green-500",
        message: "11:56 PM. Selfish by JT. You remember.",
        image: "",
    },
    {
        id: 8,
        name: "Our Song",
        type: "property" as const,
        color: "bg-green-500",
        message: "The one that plays and instantly takes us back.",
        image: "",
    },
    {
        id: 9,
        name: "Forever",
        type: "go" as const,
        color: "bg-rose-500",
        message: "You've reached the end of the board... but never the end of us.",
        image: "",
    },
];

export default function MonopolyBoard() {
    const [playerPosition, setPlayerPosition] = useState(0);
    const [diceValue, setDiceValue] = useState<number | null>(null);
    const [isRolling, setIsRolling] = useState(false);
    const [activeTile, setActiveTile] = useState<typeof TILES[0] | null>(null);
    const [visitedTiles, setVisitedTiles] = useState<Set<number>>(new Set([0]));
    const [gameComplete, setGameComplete] = useState(false);

    const rollDice = () => {
        if (isRolling || gameComplete) return;
        setIsRolling(true);
        setActiveTile(null);

        // Animate dice rolling
        let rollCount = 0;
        const rollInterval = setInterval(() => {
            setDiceValue(Math.floor(Math.random() * 6) + 1);
            rollCount++;
            if (rollCount > 10) {
                clearInterval(rollInterval);
                const finalRoll = Math.floor(Math.random() * 3) + 1; // 1-3 to move slowly
                setDiceValue(finalRoll);

                // Move player
                const newPosition = Math.min(playerPosition + finalRoll, TILES.length - 1);
                setPlayerPosition(newPosition);
                setVisitedTiles(prev => new Set([...prev, newPosition]));

                // Show tile content after movement animation
                setTimeout(() => {
                    setActiveTile(TILES[newPosition]);
                    setIsRolling(false);

                    if (newPosition >= TILES.length - 1) {
                        setGameComplete(true);
                    }
                }, 600);
            }
        }, 80);
    };

    return (
        <section id="monopoly-game" className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#0a0a0a]">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                />
            </div>

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 text-center mb-12"
            >
                <h2
                    className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-2"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                    Our <span className="text-rose-500">Monopoly</span>
                </h2>
                <p className="text-white/40 font-mono text-xs tracking-[0.3em] uppercase">
                    Roll the dice. Relive the moments.
                </p>
            </motion.div>

            {/* Board Path */}
            <div className="relative z-10 w-full max-w-5xl px-4 mb-12">
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {TILES.map((tile, index) => {
                        const isCurrentPosition = playerPosition === index;
                        const isVisited = visitedTiles.has(index);

                        return (
                            <motion.div
                                key={tile.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className={`relative w-20 h-24 md:w-28 md:h-32 rounded-xl border-2 flex flex-col items-center justify-center cursor-default transition-all duration-300
                                    ${isCurrentPosition ? "border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-110" : isVisited ? "border-white/30" : "border-white/10"}
                                    ${isVisited ? "bg-white/10" : "bg-white/5"}`}
                                onClick={() => isVisited && setActiveTile(tile)}
                            >
                                {/* Color bar at top */}
                                <div className={`absolute top-0 left-0 right-0 h-2 rounded-t-lg ${tile.color}`} />

                                {/* Tile image (if available) */}
                                {tile.image && (
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg overflow-hidden mb-1 mt-2">
                                        <img src={tile.image} alt={tile.name} className="w-full h-full object-cover" />
                                    </div>
                                )}

                                {/* Tile icon for special tiles */}
                                {!tile.image && tile.type === "chance" && (
                                    <span className="text-2xl mt-2">?</span>
                                )}
                                {!tile.image && tile.type === "chest" && (
                                    <span className="text-2xl mt-2">&#x2764;</span>
                                )}
                                {!tile.image && tile.type === "go" && (
                                    <span className="text-2xl mt-2">{index === 0 ? "&#x2192;" : "&#x2605;"}</span>
                                )}

                                {/* Tile name */}
                                <p className="text-[9px] md:text-[11px] text-white/70 font-mono text-center px-1 mt-auto mb-2 leading-tight">
                                    {tile.name}
                                </p>

                                {/* Player token */}
                                {isCurrentPosition && (
                                    <motion.div
                                        layoutId="player-token"
                                        className="absolute -top-3 left-1/2 -translate-x-1/2"
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    >
                                        <div className="w-6 h-6 rounded-full bg-rose-500 border-2 border-white shadow-[0_0_15px_rgba(244,63,94,0.8)] flex items-center justify-center text-xs">
                                            &#x2665;
                                        </div>
                                    </motion.div>
                                )}

                                {/* Visited checkmark */}
                                {isVisited && !isCurrentPosition && (
                                    <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[8px] text-white">
                                        &#x2713;
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Dice & Controls */}
            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Dice */}
                <motion.button
                    onClick={rollDice}
                    disabled={isRolling || gameComplete}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-20 h-20 rounded-2xl border-2 border-white/30 flex items-center justify-center text-3xl font-bold text-white transition-all
                        ${isRolling ? "animate-bounce bg-white/20" : "bg-white/10 hover:bg-white/20 cursor-pointer"}
                        ${gameComplete ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {diceValue || "?"}
                </motion.button>

                <p className="text-white/40 font-mono text-xs tracking-widest uppercase">
                    {gameComplete ? "Journey Complete" : isRolling ? "Rolling..." : "Tap dice to roll"}
                </p>
            </div>

            {/* Tile Popup */}
            <AnimatePresence>
                {activeTile && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setActiveTile(null)}
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div
                            className="relative bg-[#1a1a1a] border border-white/20 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Color accent */}
                            <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${activeTile.color}`} />

                            {/* Tile type badge */}
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-4 ${activeTile.color} text-white`}>
                                {activeTile.type === "chance" ? "Chance Card" : activeTile.type === "chest" ? "Community Chest" : activeTile.name}
                            </div>

                            {/* Image */}
                            {activeTile.image && (
                                <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                                    <img src={activeTile.image} alt={activeTile.name} className="w-full h-full object-cover" />
                                </div>
                            )}

                            {/* Message */}
                            <p
                                className="text-white/90 text-lg leading-relaxed italic"
                                style={{ fontFamily: "var(--font-bodoni), serif" }}
                            >
                                &quot;{activeTile.message}&quot;
                            </p>

                            {/* Close hint */}
                            <p className="text-white/30 text-xs font-mono mt-6 tracking-widest">TAP ANYWHERE TO CLOSE</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
