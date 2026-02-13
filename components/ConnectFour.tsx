"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- CONFIGURATION ---
const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const P1 = 1; // You (White Witch)
const P2 = 2; // The Past (Wicked Soul)

export default function ConnectFour() {
    // Game State
    const [board, setBoard] = useState<number[][]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<number>(P1);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState<number | null>(null);

    // Initialize Board
    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = () => {
        const newBoard = Array(ROWS).fill(null).map(() => Array(COLS).fill(EMPTY));
        setBoard(newBoard);
        setCurrentPlayer(P1);
        setGameOver(false);
        setWinner(null);
    };

    // Handle Drop
    const handleDrop = (colIndex: number) => {
        if (gameOver) return;

        // Clone board
        const newBoard = board.map(row => [...row]);

        // Find standard landing spot (gravity)
        let rowIndex = -1;
        for (let r = ROWS - 1; r >= 0; r--) {
            if (newBoard[r][colIndex] === EMPTY) {
                rowIndex = r;
                break;
            }
        }

        // Column full?
        if (rowIndex === -1) return;

        // Place piece
        newBoard[rowIndex][colIndex] = currentPlayer;
        setBoard(newBoard);

        // Check Win
        if (checkWin(newBoard, rowIndex, colIndex, currentPlayer)) {
            setGameOver(true);
            setWinner(currentPlayer);
        } else {
            // Switch Turn
            setCurrentPlayer(prev => prev === P1 ? P2 : P1);
        }
    };

    // Win Logic
    const checkWin = (board: number[][], r: number, c: number, player: number) => {
        // Directions: [rowDelta, colDelta]
        const directions = [
            [0, 1],  // Horizontal
            [1, 0],  // Vertical
            [1, 1],  // Diagonal /
            [1, -1]  // Diagonal \
        ];

        for (const [dr, dc] of directions) {
            let count = 1;

            // Check + direction
            for (let i = 1; i < 4; i++) {
                const nr = r + dr * i;
                const nc = c + dc * i;
                if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc] === player) {
                    count++;
                } else break;
            }

            // Check - direction
            for (let i = 1; i < 4; i++) {
                const nr = r - dr * i;
                const nc = c - dc * i;
                if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc] === player) {
                    count++;
                } else break;
            }

            if (count >= 4) return true;
        }
        return false;
    };

    // AI Turn (Simple Random for "The Past")
    useEffect(() => {
        if (currentPlayer === P2 && !gameOver) {
            const timer = setTimeout(() => {
                // Determine valid columns
                const validCols = [];
                for (let c = 0; c < COLS; c++) {
                    if (board[0][c] === EMPTY) validCols.push(c);
                }

                if (validCols.length > 0) {
                    const randomCol = validCols[Math.floor(Math.random() * validCols.length)];
                    handleDrop(randomCol);
                }
            }, 800); // Thinking delay
            return () => clearTimeout(timer);
        }
    }, [currentPlayer, gameOver, board]);


    return (
        <section id="redemption-game" className="relative w-full min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center py-20 overflow-hidden font-sans">

            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-950/30 via-black to-black opacity-80" />
            <div className="absolute inset-0 opacity-[0.10]" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />

            {/* Redemption Text */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 text-center mb-12"
            >
                <div className="inline-block px-4 py-1 rounded-full border border-rose-500/20 bg-rose-500/5 backdrop-blur-sm mb-4">
                    <span className="text-rose-200/60 font-mono text-[10px] tracking-[0.3em] uppercase">
                        Intermission
                    </span>
                </div>
                <h3 className="text-white/80 font-serif italic text-3xl md:text-5xl tracking-tight">
                    A Game of <span className="text-rose-500">Redemption</span>
                </h3>
                <p className="text-white/40 mt-4 font-mono text-xs tracking-widest uppercase">
                    Now&apos;s your time to rewrite history
                </p>
            </motion.div>

            {/* Header */}
            <div className="relative z-10 flex justify-between items-center w-full max-w-lg mb-12 px-8">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)] border-4 border-white/5 flex items-center justify-center">
                        <span className="text-rose-950 text-xl font-bold">♥</span>
                    </div>
                    <span className="text-rose-100 font-bold text-xs tracking-[0.2em] uppercase">White Witch</span>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <div className="text-2xl font-serif italic text-white/20">vs</div>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-slate-700 shadow-inner border-4 border-white/5 flex items-center justify-center">
                        <span className="text-slate-400 text-xl font-bold">✖</span>
                    </div>
                    <span className="text-slate-400 font-bold text-xs tracking-[0.2em] uppercase">Wicked Soul</span>
                </div>
            </div>

            {/* The Board */}
            <div className="relative z-10 p-4 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                {/* Board Frame */}
                <div className="grid grid-cols-7 gap-2 md:gap-3 bg-black/40 p-4 rounded-[2rem] border border-white/5 shadow-inner">
                    {/* Columns */}
                    {[...Array(COLS)].map((_, colIndex) => (
                        <div
                            key={colIndex}
                            className={`relative flex flex-col gap-2 md:gap-3 cursor-pointer rounded-full transition-all duration-300 pt-2 pb-2 px-1 group
                                ${colIndex === 3 && !gameOver
                                    ? "bg-rose-500/5 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]"
                                    : "hover:bg-white/5 border border-transparent"
                                }
                            `}
                            onClick={() => handleDrop(colIndex)}
                        >
                            {/* Visual Clue for Winning Column (Index 3) */}
                            {colIndex === 3 && !gameOver && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    className="absolute -top-12 left-0 right-0 flex flex-col items-center z-20 pointer-events-none"
                                >
                                    <motion.div
                                        animate={{ y: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-6 h-6 text-rose-500 mx-auto drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                                        >
                                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                        </svg>
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* Rows (Top to Bottom visually in DOM, but index 0 is top) */}
                            {board.map((row, rowIndex) => {
                                const cell = row[colIndex];
                                // Render row
                                return (
                                    <div key={rowIndex} className="relative w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#0a0a0a] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center">

                                        {/* Piece */}
                                        <AnimatePresence>
                                            {cell !== EMPTY && (
                                                <motion.div
                                                    initial={{ y: -400, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                                    className={`w-full h-full rounded-full shadow-[inset_0_-4px_4px_rgba(0,0,0,0.3)] relative
                                                        ${cell === P1
                                                            ? "bg-gradient-to-br from-rose-400 to-rose-600 shadow-[0_0_10px_rgba(244,63,94,0.4)]"
                                                            : "bg-gradient-to-br from-slate-600 to-slate-800"
                                                        }`}
                                                >
                                                    {/* Shine highlight */}
                                                    <div className="absolute top-2 left-2 w-1/3 h-1/3 bg-white/20 rounded-full blur-[2px]" />

                                                    {/* Symbol */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-60">
                                                        {cell === P1 ? (
                                                            <span className="text-rose-950 font-bold text-lg">♥</span>
                                                        ) : (
                                                            <span className="text-black/40 font-bold text-lg">✖</span>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Victory Overlay */}
            <AnimatePresence>
                {gameOver && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="text-center p-12 bg-[#0a0a0a] border border-rose-500/30 rounded-3xl shadow-2xl max-w-sm mx-4 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-rose-500/5 pointer-events-none" />

                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-6xl md:text-8xl mb-6 relative z-10"
                            >
                                👑
                            </motion.div>
                            <h2 className="text-2xl md:text-3xl font-serif italic text-rose-500 mb-4 relative z-10">
                                White Witch Finally Wins
                            </h2>
                            <p className="text-white/60 text-sm font-mono tracking-widest uppercase mb-8 relative z-10">
                                As it should be.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    document.getElementById('chat-floating')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="relative z-10 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-rose-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            >
                                Proceed ↘
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
