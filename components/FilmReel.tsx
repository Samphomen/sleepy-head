"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const PHOTOS = [
    { id: 1, src: "/videos/reel/Reel-1.mp4", type: "video" },
    { id: 2, src: "/videos/reel/Reel-2.mp4", type: "video" },
    { id: 3, src: "/videos/reel/Reel-3.mp4", type: "video" },
    { id: 4, src: "/videos/reel/Reel-4.mp4", type: "video" },
    { id: 5, src: "/videos/reel/Reel-5.mp4", type: "video" },
    { id: 6, src: "/videos/reel/Reel-6.jpg", type: "image" },
    { id: 7, src: "/videos/memories/Shine-on-em.mp4", type: "video" },
    { id: 8, src: "/videos/reel/Reel-8.mp4", type: "video" },
];

export default function FilmReel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const directionRef = useRef(1); // 1 = Right, -1 = Left
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const scrollContainer = scrollRef.current;

        // Define the animation loop
        const animate = () => {
            if (scrollContainer && !isPaused) {
                // Determine bounds
                const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

                // Flip direction at edges
                if (scrollContainer.scrollLeft >= maxScroll - 1) {
                    directionRef.current = -1;
                } else if (scrollContainer.scrollLeft <= 0) {
                    directionRef.current = 1;
                }

                // Move
                scrollContainer.scrollLeft += directionRef.current * 1.5; // Increased speed for visibility
            }

            // Keep looping
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Start loop
        animationFrameRef.current = requestAnimationFrame(animate);

        // Cleanup on unmount or pause change
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isPaused]); // Re-run when pause state changes

    return (
        <section id="film-reel" className="relative h-screen bg-transparent flex flex-col justify-center overflow-hidden">

            {/* Title Overlay */}
            <div className="absolute bottom-10 left-10 pointer-events-none z-20">
                <h2 className="text-white/20 text-9xl font-black uppercase leading-none tracking-tighter">
                    Timeline
                </h2>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={scrollRef}
                className={`
                    flex items-center gap-4 px-20 overflow-x-auto overflow-y-hidden w-full h-full scrollbar-hide
                    ${isPaused ? 'snap-x snap-mandatory cursor-grab active:cursor-grabbing' : 'pointer-events-auto'}
                `}
            >

                {PHOTOS.map((photo, index) => (
                    <div
                        key={index}
                        className="relative flex-shrink-0 w-[500px] h-[400px] bg-black border-y-8 border-dashed border-gray-800 flex flex-col items-center justify-center p-4 snap-center mx-4 select-none hover:scale-105 transition-transform duration-300"
                        // Pause only when hovering a specific frame
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                    >

                        {/* Sprocket Holes (Top & Bottom) */}
                        <div className="absolute top-2 left-0 right-0 h-4 flex justify-between px-4">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="w-3 h-4 bg-transparent border border-white/20 rounded-sm" />
                            ))}
                        </div>
                        <div className="absolute bottom-2 left-0 right-0 h-4 flex justify-between px-4">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="w-3 h-4 bg-transparent border border-white/20 rounded-sm" />
                            ))}
                        </div>

                        {/* The Photo/Video Frame */}
                        <div className="relative w-full h-[85%] bg-black overflow-hidden border border-gray-800 rounded-sm">
                            {photo.type === "video" ? (
                                <video
                                    src={photo.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover opacity-90 transition-opacity duration-500"
                                />
                            ) : (
                                <img src={photo.src} alt="Memory" className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0" />
                            )}
                        </div>

                        {/* Frame Number */}
                        <div className="absolute -bottom-8 left-4 text-gray-500 text-xs font-mono">
                            {String(index + 1).padStart(2, '0')}A
                        </div>

                    </div>
                ))}

                {/* END TEXT FRAME */}
                <div className="relative flex-shrink-0 w-[600px] h-[400px] flex items-center justify-center snap-center">
                    <h3 className="text-6xl font-black text-white tracking-tighter text-center uppercase whitespace-nowrap drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        and more to come?
                    </h3>
                </div>

            </div>
        </section>
    );
}
