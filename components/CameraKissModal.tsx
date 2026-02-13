"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Send, RotateCcw } from "lucide-react";

interface CameraKissModalProps {
    isOpen: boolean;
    onClose: () => void;
    cardTitle: string;
    cardIcon: string;
}

export default function CameraKissModal({ isOpen, onClose, cardTitle, cardIcon }: CameraKissModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [status, setStatus] = useState<"camera" | "preview" | "sending" | "sent" | "error">("camera");
    const [countdown, setCountdown] = useState<number | null>(null);

    const [cameraReady, setCameraReady] = useState(false);

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setCameraReady(false);
    }, []);

    const [errorMsg, setErrorMsg] = useState("");

    const startCamera = useCallback(async () => {
        try {
            setCameraReady(false);
            setStatus("camera");
            setCapturedImage(null);
            setErrorMsg("");

            // Small delay to ensure the video element is in the DOM
            await new Promise(resolve => setTimeout(resolve, 300));

            // Check if camera API is available
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                setErrorMsg("Camera API not available. Make sure you're on HTTPS or localhost.");
                setStatus("error");
                return;
            }

            // Try simple constraints first, fall back if needed
            let stream: MediaStream;
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
            } catch (firstErr: any) {
                // If basic request fails, camera is truly unavailable
                if (firstErr.name === "NotAllowedError") {
                    setErrorMsg("Camera permission denied. Please allow camera access in your browser settings.");
                } else if (firstErr.name === "NotFoundError") {
                    setErrorMsg("No camera found on this device.");
                } else {
                    setErrorMsg(`Camera error: ${firstErr.message || firstErr.name}`);
                }
                setStatus("error");
                return;
            }

            streamRef.current = stream;

            // Retry attaching stream until video ref is available
            let attempts = 0;
            const attachStream = () => {
                attempts++;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current?.play().catch(console.error);
                        setCameraReady(true);
                    };
                } else if (attempts < 20) {
                    setTimeout(attachStream, 100);
                } else {
                    setErrorMsg("Could not attach camera to display.");
                    setStatus("error");
                }
            };
            attachStream();
        } catch (err: any) {
            console.error("Camera error:", err);
            setErrorMsg(err.message || "Unknown camera error");
            setStatus("error");
        }
    }, []);

    // Start camera when modal opens
    useEffect(() => {
        if (isOpen) {
            startCamera();
        }
        return () => stopCamera();
    }, [isOpen, startCamera, stopCamera]);

    const capturePhoto = () => {
    // More thorough validation
    if (!videoRef.current) {
        console.error("Video ref is null");
        return;
    }
    
    if (countdown !== null) {
        console.log("Countdown already in progress");
        return;
    }
    
    if (!cameraReady) {
        console.error("Camera not ready yet");
        return;
    }
    
    // Check if video actually has dimensions (meaning it's streaming)
    if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
        console.error("Video dimensions are 0 - camera not streaming properly", {
            videoWidth: videoRef.current.videoWidth,
            videoHeight: videoRef.current.videoHeight,
            readyState: videoRef.current.readyState
        });
        return;
    }

    console.log("Starting capture with dimensions:", {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight
    });

    // 3-2-1 countdown
    setCountdown(3);
    let count = 3;
    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            setCountdown(count);
        } else {
            clearInterval(interval);
            setCountdown(null);

            // Double-check video ref still exists after countdown
            const video = videoRef.current;
            if (!video) {
                console.error("Video ref lost during countdown");
                return;
            }

            // Verify video still has dimensions
            if (video.videoWidth === 0 || video.videoHeight === 0) {
                console.error("Video lost dimensions during countdown");
                return;
            }

            // Capture the frame
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            
            if (!ctx) {
                console.error("Could not get canvas context");
                return;
            }

            try {
                // Mirror the image (front camera is mirrored in preview)
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
                console.log("Capture successful, data URL length:", dataUrl.length);
                
                setCapturedImage(dataUrl);
                setStatus("preview");
                stopCamera();
            } catch (error) {
                console.error("Error capturing image:", error);
            }
        }
    }, 1000);
};

    const retake = () => {
        setCapturedImage(null);
        startCamera();
    };

    const sendKiss = async () => {
        if (!capturedImage) return;
        setStatus("sending");

        try {
            const res = await fetch("/api/send-kiss", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    image: capturedImage,
                    cardChoice: cardTitle,
                }),
            });

            if (res.ok) {
                setStatus("sent");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const handleClose = () => {
        stopCamera();
        setCapturedImage(null);
        setStatus("camera");
        setCountdown(null);
        onClose();
    };

    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 z-[110] text-white/40 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                {/* 3-section vertical layout */}
                <div className="w-full max-w-lg h-[90vh] max-h-[800px] flex flex-col">

                    {/* === TOP SECTION === Fancy message */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex-shrink-0 text-center py-6 md:py-8 px-6"
                    >
                        {/* Decorative line */}
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-rose-500/50" />
                            <span className="text-3xl">{cardIcon}</span>
                            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-rose-500/50" />
                        </div>

                        <h2
                            className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight"
                            style={{ fontFamily: "var(--font-playfair), serif" }}
                        >
                            Seal It With A Kiss
                        </h2>
                        <p className="text-rose-400/60 text-xs tracking-[0.3em] uppercase font-mono">
                            {cardTitle}
                        </p>
                    </motion.div>

                    {/* === MIDDLE SECTION === Camera Viewfinder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex-1 relative mx-6 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-[0_0_40px_rgba(244,63,94,0.1)]"
                    >
                        {/* Camera feed */}
                        {status === "camera" && (
                            <>
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full h-full object-cover transform scale-x-[-1]"
                                />

                                {/* Loading indicator while camera connects */}
                                {!cameraReady && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] z-10">
                                        <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mb-4" />
                                        <p className="text-white/40 text-xs tracking-widest uppercase font-mono">Starting camera...</p>
                                    </div>
                                )}

                                {/* Viewfinder overlay */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* Corner brackets */}
                                    <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-rose-500/50 rounded-tl-md" />
                                    <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-rose-500/50 rounded-tr-md" />
                                    <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-rose-500/50 rounded-bl-md" />
                                    <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-rose-500/50 rounded-br-md" />

                                    {/* Center crosshair */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <div className="w-6 h-[1px] bg-white/20" />
                                        <div className="w-[1px] h-6 bg-white/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>

                                    {/* Vignette */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
                                </div>

                                {/* Countdown overlay */}
                                <AnimatePresence>
                                    {countdown !== null && (
                                        <motion.div
                                            key={countdown}
                                            initial={{ scale: 2, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="absolute inset-0 flex items-center justify-center bg-black/30"
                                        >
                                            <span className="text-9xl font-bold text-white drop-shadow-[0_0_40px_rgba(244,63,94,0.8)]">
                                                {countdown}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        )}

                        {/* Photo preview */}
                        {(status === "preview" || status === "sending" || status === "sent") && capturedImage && (
                            <motion.img
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                src={capturedImage}
                                alt="Your kiss"
                                className="w-full h-full object-cover"
                            />
                        )}

                        {/* Sent celebration overlay */}
                        {status === "sent" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: -10 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                                    className="text-center"
                                >
                                    <span className="text-7xl block mb-4">💋</span>
                                    <p className="text-white text-2xl font-serif" style={{ fontFamily: "var(--font-playfair), serif" }}>
                                        Date Sealed!
                                    </p>
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Error state */}
                        {status === "error" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/90">
                                <div className="text-center px-8">
                                    <p className="text-white/60 mb-2 text-sm">{errorMsg || "Couldn't access the camera."}</p>
                                    <p className="text-white/30 mb-6 text-xs">Check browser permissions or Windows camera privacy settings.</p>
                                    <button
                                        onClick={startCamera}
                                        className="px-6 py-2 bg-rose-600 text-white rounded-full text-sm tracking-widest uppercase hover:bg-rose-500 transition-colors"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* === BOTTOM SECTION === Controls & message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex-shrink-0 py-6 md:py-8 px-6 flex flex-col items-center gap-3"
                    >
                        {/* Camera mode - Capture button */}
                        {status === "camera" && (
                            <>
                                <button
                                    onClick={capturePhoto}
                                    disabled={countdown !== null}
                                    className="w-18 h-18 rounded-full bg-gradient-to-b from-rose-500 to-rose-700 hover:from-rose-400 hover:to-rose-600 transition-all shadow-[0_0_25px_rgba(244,63,94,0.5)] flex items-center justify-center disabled:opacity-50 p-5 border-2 border-rose-400/30"
                                >
                                    <Camera className="text-white" size={28} />
                                </button>
                                <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-mono mt-1">
                                    Blow a kiss & tap to capture
                                </p>
                            </>
                        )}

                        {/* Preview mode - Retake / Send */}
                        {status === "preview" && (
                            <>
                                <div className="flex gap-4">
                                    <button
                                        onClick={retake}
                                        className="px-6 py-3 bg-white/10 text-white rounded-full text-xs tracking-[0.15em] uppercase flex items-center gap-2 hover:bg-white/20 transition-colors border border-white/10"
                                    >
                                        <RotateCcw size={14} />
                                        Retake
                                    </button>
                                    <button
                                        onClick={sendKiss}
                                        className="px-8 py-3 bg-rose-600 text-white rounded-full text-xs tracking-[0.15em] uppercase flex items-center gap-2 hover:bg-rose-500 transition-colors shadow-[0_0_20px_rgba(244,63,94,0.4)] border border-rose-400/30"
                                    >
                                        <Send size={14} />
                                        Seal The Date
                                    </button>
                                </div>
                                <p className="text-white/20 text-[10px] tracking-[0.2em] uppercase font-mono mt-1">
                                    Happy with it? Seal the deal
                                </p>
                            </>
                        )}

                        {/* Sending state */}
                        {status === "sending" && (
                            <div className="flex items-center gap-3 py-3">
                                <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                                <p className="text-rose-400/60 text-xs tracking-[0.2em] uppercase font-mono">Sealing the date...</p>
                            </div>
                        )}

                        {/* Sent state */}
                        {status === "sent" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-2"
                            >
                                <p className="text-rose-400 text-sm tracking-[0.2em] uppercase font-mono mb-3">
                                    It&apos;s officially a date!
                                </p>
                                <button
                                    onClick={handleClose}
                                    className="px-8 py-2.5 bg-white/10 text-white/60 rounded-full text-xs tracking-[0.15em] uppercase hover:bg-white/20 transition-colors border border-white/10"
                                >
                                    Close
                                </button>
                            </motion.div>
                        )}
                    </motion.div>

                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}
