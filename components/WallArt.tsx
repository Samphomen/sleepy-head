"use client";

import React from "react";
import { motion } from "framer-motion";

const WALL_PHOTOS = [
    // --- TOP LAYER (High Z-Index) ---
    { id: 1, src: "/wall-art/photo1.png", type: "image", size: "w-64 h-80", rotation: -15, top: "-5%", left: "-2%", zIndex: 40 },
    { id: 2, src: "https://images.unsplash.com/photo-1516589174184-c68526514b48", type: "image", size: "w-80 h-64", rotation: 12, top: "2%", left: "18%", zIndex: 35 },
    { id: 3, src: "/wall-art/photo3.png", type: "image", size: "w-72 h-96", rotation: -20, top: "8%", left: "40%", zIndex: 45 },
    { id: 4, src: "https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-couple-walking-at-the-beach-4389-large.mp4", type: "video", size: "w-[400px] h-[300px]", rotation: 8, top: "-2%", left: "65%", zIndex: 40 },
    { id: 5, src: "/wall-art/photo4.png", type: "image", size: "w-60 h-80", rotation: -8, top: "5%", left: "85%", zIndex: 38 },

    // --- MIDDLE LAYER ---
    { id: 6, src: "https://images.unsplash.com/photo-1518199266791-5d9b29bb895c", type: "image", size: "w-80 h-96", rotation: 18, top: "25%", left: "5%", zIndex: 32 },
    { id: 7, src: "/wall-art/photo2.png", type: "image", size: "w-72 h-72", rotation: -10, top: "30%", left: "22%", zIndex: 27 },
    { id: 8, src: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-running-in-a-field-at-sunset-1033-large.mp4", type: "video", size: "w-[450px] h-[300px]", rotation: 14, top: "28%", left: "45%", zIndex: 29 },
    { id: 9, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc", type: "image", size: "w-64 h-80", rotation: -12, top: "22%", left: "75%", zIndex: 31 },
    { id: 10, src: "https://images.unsplash.com/photo-1522673607200-1648832cee98", type: "image", size: "w-72 h-96", rotation: 15, top: "20%", left: "90%", zIndex: 26 },

    // --- GAP FILLERS 1 ---
    { id: 25, src: "https://images.unsplash.com/photo-1516051662687-567d7c4e8f6a", type: "image", size: "w-64 h-80", rotation: 5, top: "10%", left: "10%", zIndex: 20 },
    { id: 26, src: "https://images.unsplash.com/photo-1513273154690-26218f6ecccd", type: "image", size: "w-80 h-64", rotation: -10, top: "15%", left: "35%", zIndex: 18 },
    { id: 27, src: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7", type: "image", size: "w-72 h-96", rotation: 25, top: "12%", left: "55%", zIndex: 22 },
    { id: 28, src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", type: "image", size: "w-96 h-72", rotation: -15, top: "35%", left: "80%", zIndex: 19 },

    // --- LOWER LAYER ---
    { id: 11, src: "/wall-art/photo3.png", type: "image", size: "w-64 h-80", rotation: -5, top: "55%", left: "-5%", zIndex: 33 },
    { id: 12, src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", type: "image", size: "w-80 h-64", rotation: -25, top: "52%", left: "15%", zIndex: 34 },
    { id: 13, src: "/wall-art/photo1.png", type: "image", size: "w-72 h-96", rotation: 10, top: "58%", left: "35%", zIndex: 28 },
    { id: 14, src: "https://images.unsplash.com/photo-1529626458564-4a003076a445", type: "image", size: "w-96 h-72", rotation: -8, top: "55%", left: "60%", zIndex: 30 },
    { id: 15, src: "/wall-art/photo4.png", type: "image", size: "w-64 h-80", rotation: 12, top: "50%", left: "82%", zIndex: 32 },

    // --- GAP FILLERS 2 ---
    { id: 29, src: "https://images.unsplash.com/photo-1517841905240-472988babdf9", type: "image", size: "w-80 h-96", rotation: 5, top: "40%", left: "5%", zIndex: 11 },
    { id: 30, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", type: "image", size: "w-72 h-72", rotation: -18, top: "45%", left: "25%", zIndex: 15 },
    { id: 31, src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04", type: "image", size: "w-80 h-64", rotation: 22, top: "42%", left: "50%", zIndex: 13 },
    { id: 32, src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d", type: "image", size: "w-64 h-80", rotation: -30, top: "38%", left: "75%", zIndex: 17 },

    // --- BOTTOM LAYER ---
    { id: 16, src: "https://images.unsplash.com/photo-1517841905240-472988babdf9", type: "image", size: "w-80 h-96", rotation: -15, top: "75%", left: "2%", zIndex: 15 },
    { id: 17, src: "/wall-art/photo2.png", type: "image", size: "w-72 h-72", rotation: 18, top: "82%", left: "25%", zIndex: 19 },
    { id: 18, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", type: "image", size: "w-80 h-64", rotation: -5, top: "80%", left: "50%", zIndex: 17 },
    { id: 19, src: "/wall-art/photo1.png", type: "image", size: "w-64 h-80", rotation: 10, top: "78%", left: "75%", zIndex: 21 },
    { id: 20, src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d", type: "image", size: "w-72 h-96", rotation: -12, top: "75%", left: "92%", zIndex: 14 },

    // --- DEEP BACKGROUND FILLERS (Plugging every last gap) ---
    { id: 33, src: "https://images.unsplash.com/photo-1513273154690-26218f6ecccd", type: "image", size: "w-[400px] h-[500px]", rotation: 5, top: "0%", left: "0%", zIndex: 1 },
    { id: 34, src: "https://images.unsplash.com/photo-1464863979621-258859e62245", type: "image", size: "w-[450px] h-[550px]", rotation: -5, top: "0%", left: "25%", zIndex: 1 },
    { id: 35, src: "https://images.unsplash.com/photo-1520850838988-502a2fd40280", type: "image", size: "w-[400px] h-[500px]", rotation: 8, top: "0%", left: "50%", zIndex: 1 },
    { id: 36, src: "https://images.unsplash.com/photo-1463320144485-3ee896c45412", type: "image", size: "w-[450px] h-[550px]", rotation: -3, top: "0%", left: "75%", zIndex: 1 },
    { id: 37, src: "https://images.unsplash.com/photo-1516051662687-567d7c4e8f6a", type: "image", size: "w-[400px] h-[500px]", rotation: 10, top: "50%", left: "0%", zIndex: 1 },
    { id: 38, src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04", type: "image", size: "w-[450px] h-[550px]", rotation: -12, top: "50%", left: "25%", zIndex: 1 },
    { id: 39, src: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7", type: "image", size: "w-[400px] h-[500px]", rotation: 6, top: "50%", left: "50%", zIndex: 1 },
    { id: 40, src: "https://images.unsplash.com/photo-1522673607200-1648832cee98", type: "image", size: "w-[450px] h-[550px]", rotation: -5, top: "50%", left: "75%", zIndex: 1 },
];

export default function WallArt() {
    return (
        <section className="relative min-h-[120vh] w-full bg-[#030303] overflow-hidden">

            {/* Background Texture: Deep and dark */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]" />

            {/* --- THE MESSY WALL --- */}
            <div className="relative w-full h-[120vh]">
                {WALL_PHOTOS.map((photo) => (
                    <motion.div
                        key={photo.id}
                        initial={{
                            opacity: 0,
                            scale: 0.8,
                            rotate: photo.rotation,
                            top: photo.top,
                            left: photo.left
                        }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{
                            scale: 1.1,
                            rotate: 0,
                            zIndex: 100,
                            transition: { type: "spring", stiffness: 300, damping: 20 }
                        }}
                        className={`absolute ${photo.size} group cursor-pointer overflow-hidden active:scale-95 bg-white p-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-shadow hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]`}
                        style={{ zIndex: photo.zIndex }}
                    >
                        {/* Media Container (Full Color, Framed) */}
                        <div className="w-full h-full relative overflow-hidden">
                            {photo.type === "video" ? (
                                <video
                                    src={photo.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img
                                    src={photo.src}
                                    alt="Wall Memory"
                                    className="w-full h-full object-cover"
                                />
                            )}

                            {/* Subtle Ambient Overlay (Lighter than before) */}
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
}
