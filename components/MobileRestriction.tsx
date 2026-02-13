"use client";

import React from "react";
import { Smartphone } from "lucide-react";

export default function MobileRestriction() {
    return (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-8 text-center md:hidden decoration-slice">
            <div className="animate-pulse mb-6 text-rose-500">
                <Smartphone size={48} />
            </div>

            <h2 className="text-2xl font-serif text-white mb-4 tracking-wide">
                Experience Optimized for Larger Screens
            </h2>

            <p className="text-white/50 text-sm font-mono leading-relaxed max-w-xs">
                To truly appreciate the details, please open this on a <span className="text-white font-bold">Laptop</span> or <span className="text-white font-bold">iPad</span>.
            </p>

            <div className="mt-8 px-4 py-2 border border-white/10 rounded-full text-[10px] text-white/30 uppercase tracking-[0.2em]">
                Mobile Access Restricted
            </div>
        </div>
    );
}
