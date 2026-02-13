"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import Gate from "@/components/Gate";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import FilmReel from "@/components/FilmReel";
import Letter from "@/components/Letter";
// import FirstKiss from "@/components/FirstKiss";
import SpotifyScanner from "@/components/SpotifyScanner";
import Stargazer from "@/components/Stargazer";
import Manifesto from "@/components/Manifesto";
import FlankingBanners from "@/components/FlankingBanners";
// import ChatFloating from "@/components/ChatFloating";
// import ConnectFour from "@/components/ConnectFour";
// import MonopolyBoard from "@/components/MonopolyBoard";
import StartScreen from "@/components/StartScreen";
import BackgroundMusic from "@/components/BackgroundMusic";
import NicknameScreen from "@/components/NicknameScreen";
import MobileRestriction from "@/components/MobileRestriction";
import QuantumTouch from "@/components/QuantumTouch";

export default function Home() {
    const isUnlocked = useStore((state) => state.isUnlocked);
    const [startInteraction, setStartInteraction] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [isStargazerComplete, setStargazerComplete] = useState(false); // Tracks constellation completion

    return (
        <main className="relative min-h-screen w-full bg-black overflow-x-hidden">

            {/* --- MOBILE RESTRICTION OVERLAY --- */}
            <MobileRestriction />

            <AnimatePresence mode="wait">
                {/* 0. Start Screen (Heart Button) */}
                {!startInteraction && (
                    <StartScreen key="start-screen" onStart={() => setStartInteraction(true)} />
                )}

                {/* Loading Screen */}
                {startInteraction && !loadingComplete && (
                    <LoadingScreen key="loading-screen" onComplete={() => setLoadingComplete(true)} />
                )}
            </AnimatePresence>

            {/* Password Gate */}
            {loadingComplete && !isUnlocked && <Gate />}

            {/* Main Content */}
            {isUnlocked && (
                <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {/* 1. HERO (The Hook) */}
                    <Hero />

                    {/* 2. GALLERY (The Vibe - "Messy Sticker" Videos) */}
                    <Gallery />

                    {/* 3. MANIFESTO (The Poetry - Deep Romance) */}
                    {/* Bridge: The Manifesto (No longer gates content) */}
                    <Manifesto onComplete={() => setStargazerComplete(true)} />

                    {/* RESTORED: FlankingBanners (Testimonial Style) */}
                    <FlankingBanners />

                    {/* 4. CONNECT FOUR (The Game - "Redemption" / Intermission) */}
                    {/* Breaks up the reading sections */}
                    {/* <ConnectFour /> */}

                    {/* MONOPOLY BOARD PATH (Future - needs tile images/events) */}
                    {/* <MonopolyBoard /> */}

                    {/* 5. CHAT MESSAGES (The Reality - "Receipts") */}
                    {/* <ChatFloating /> */}

                    {/* 6. NICKNAME NOTE (The Secret - Intimate) */}
                    <NicknameScreen />

                    {/* 7. FILM REEL (The History - Timeline) */}
                    <FilmReel />

                    {/* 7.5. FIRST KISS (Dedicated Memory Screen) */}
                    {/* <FirstKiss /> */}

                    {/* 8. LETTER (The Finale - Emotional Climax) */}
                    <Letter />


                    {/* 9. THE PROPOSAL (The Grand Finale) - "The Quantum Touch" */}
                    <QuantumTouch />

                    {/* 10. SPOTIFY SCANNER (The Soundtrack) */}
                    <SpotifyScanner />
                </motion.div>
            )}
            {/* --- GLOBAL FILM GRAIN OVERLAY --- */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.08] mix-blend-overlay"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
            />

            {/* --- BACKGROUND MUSIC PLAYER (Unlocks with Start Interaction) --- */}
            {/* Now plays as soon as user clicks the Heart button */}
            <BackgroundMusic shouldPlay={startInteraction} />
        </main>
    );
}
