'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, RefreshCw, ChefHat, Loader2, Image as ImageIcon, X, Sparkles, ChevronUp, ScanLine, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// --- Types ---
interface Suggestion {
    name: string;
    description: string;
}

interface AnalysisResult {
    ingredients: string[];
    recommendedProduct?: string;
    suggestions: Suggestion[];
    rawText?: string;
}

export default function VisionChefPage() {
    return (
        <div className="h-[100dvh] bg-white text-stone-900 font-outfit relative overflow-hidden flex flex-col items-center justify-center p-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />

            {/* Content Container */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 max-w-2xl w-full text-center space-y-12"
            >
                {/* Visual Icon */}
                <div className="relative inline-block">
                    <motion.div
                        animate={{ 
                            rotate: [0, -10, 10, -10, 0],
                            y: [0, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-32 h-32 bg-stone-900 rounded-full flex items-center justify-center mx-auto shadow-2xl relative z-20"
                    >
                        <ChefHat className="w-16 h-16 text-white" />
                    </motion.div>
                    {/* Spilled Noodle Element */}
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [-15, -20, -15]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -bottom-2 -right-10 text-7xl z-30 drop-shadow-2xl"
                    >
                        🍜
                    </motion.div>
                </div>

                {/* Message */}
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-stone-900">
                        Oops! <span className="text-[#C8956C]">Mì đổ rồi...</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-stone-500 font-medium leading-relaxed max-w-lg mx-auto">
                        Vision Chef đang bận dọn dẹp một chút "sự cố thơm ngon" này. 
                        Vui lòng quay lại sau khi chúng tôi lau xong nhé!
                    </p>
                </div>

                {/* CTA / Back Button */}
                <div className="pt-8">
                    <Link href="/">
                        <button className="px-10 py-5 bg-stone-900 text-white rounded-full font-bold text-lg hover:bg-stone-800 transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center gap-3 mx-auto">
                            <Home className="w-6 h-6" />
                            Quay Lại Trang Chủ
                        </button>
                    </Link>
                </div>

                {/* Mini Status */}
                <div className="pt-12 text-stone-400 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                    Đang vệ sinh bếp...
                </div>
            </motion.div>

            {/* Floating Elements (Visual Polish) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
                        className="absolute text-4xl"
                        style={{
                            top: `${20 + i * 15}%`,
                            left: `${10 + i * 20}%`,
                        }}
                    >
                        ✨
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
