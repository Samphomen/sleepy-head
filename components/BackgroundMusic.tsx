"use client";

import React, { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

interface BackgroundMusicProps {
    shouldPlay?: boolean;
}

export default function BackgroundMusic({ shouldPlay = false }: BackgroundMusicProps) {
    const playerRef = useRef<any>(null);
    const isUnlocked = useStore((state) => state.isUnlocked);
    const hasStartedRef = useRef(false);
    const shouldPlayRef = useRef(shouldPlay);

    // Keep ref in sync
    useEffect(() => {
        shouldPlayRef.current = shouldPlay;
    }, [shouldPlay]);

    useEffect(() => {
        // 1. Load the IFrame Player API code asynchronously.
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        } else if (window.onYouTubeIframeAPIReady) {
            window.onYouTubeIframeAPIReady();
        }

        // 2. This function creates an <iframe> (and YouTube player)
        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('bg-music-player', {
                height: '0',
                width: '0',
                videoId: '3lHbd8jQUSk',
                playerVars: {
                    'autoplay': 0, // Don't autoplay immediately on load
                    'controls': 0,
                    'loop': 1,
                    'playlist': '3lHbd8jQUSk', // Loop single video
                    'playsinline': 1,
                },
                events: {
                    'onReady': (event: any) => {
                        // Check strict ref value to avoid closure staleness
                        if (shouldPlayRef.current) {
                            event.target.setVolume(50); // Set to 50% volume
                            event.target.playVideo();
                            hasStartedRef.current = true;
                        }
                    },
                }
            });
        };

        return () => {
            if (playerRef.current && playerRef.current.destroy) {
                playerRef.current.destroy(); // Proper cleanup to stop old tracks
            }
        };
    }, []);

    // Watch for Start Trigger (or Unlock state for backup)
    useEffect(() => {
        if (shouldPlay && playerRef.current && playerRef.current.playVideo) {
            attemptPlay();
        }
    }, [shouldPlay]);

    const attemptPlay = () => {
        if (hasStartedRef.current) return;

        if (playerRef.current && playerRef.current.playVideo) {
            playerRef.current.setVolume(50); // Set to 50% volume
            playerRef.current.playVideo();
            hasStartedRef.current = true;
        }
    };

    return (
        <div className="fixed opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
            <div id="bg-music-player" />
        </div>
    );
}
