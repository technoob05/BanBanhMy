'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, RefreshCw, ChefHat, Loader2, Image as ImageIcon, X, Sparkles, ChevronUp, ScanLine, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Suggestion {
    name: string;
    description: string;
}

interface AnalysisResult {
    ingredients: string[];
    suggestions: Suggestion[];
    rawText?: string;
}

export default function VisionChefPage() {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    // UI States
    const [mode, setMode] = useState<'intro' | 'camera' | 'preview' | 'results'>('intro');

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- Camera Logic ---
    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            setStream(mediaStream);
            setMode('camera');
        } catch (err) {
            console.error("Camera Error:", err);
            alert("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.");
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                setCapturedImage(dataUrl);
                stopCamera();
                setMode('preview');
            }
        }
    };

    // Attach stream to video element when in camera mode
    useEffect(() => {
        if (mode === 'camera' && stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [mode, stream]);

    // Handle File Upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCapturedImage(reader.result as string);
                setMode('preview');
                // Optional: Auto analyze? No, let user confirm.
            };
            reader.readAsDataURL(file);
        }
    };

    // --- Analysis Logic ---
    const analyzeImage = async () => {
        if (!capturedImage) return;

        setIsAnalyzing(true);
        const base64Data = capturedImage.split(',')[1];
        const mimeType = capturedImage.split(';')[0].split(':')[1];

        try {
            const response = await fetch('/api/analyze-fridge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageBase64: base64Data, mimeType }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to analyze');

            setResult(data);
            setMode('results');
        } catch (error: any) {
            console.error("Analysis failed:", error);
            alert(`Lỗi phân tích: ${error.message}`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    // Reset flow
    const reset = () => {
        stopCamera();
        setCapturedImage(null);
        setResult(null);
        setMode('intro');
    };

    return (
        <div className="h-[100dvh] bg-white text-stone-900 font-outfit relative overflow-hidden flex flex-col md:items-center md:justify-center md:bg-stone-50 md:p-8">

            {/* Desktop Container */}
            <div className="flex-1 w-full md:h-[85vh] md:max-w-6xl md:bg-white md:rounded-3xl md:shadow-2xl md:overflow-hidden md:flex md:border md:border-stone-200">

                {/* --- LEFT SIDE: CAMERA / VISUALS --- */}
                <div className="relative w-full h-full md:w-1/2 md:bg-stone-100 md:relative overflow-hidden flex flex-col items-center justify-center bg-stone-950 text-white md:text-stone-900">

                    {/* Background Pattern for Desktop Left */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 md:opacity-5 z-0 pointer-events-none" />

                    <AnimatePresence mode="wait">

                        {/* 1. INTRO STATE (Left) */}
                        {mode === 'intro' && (
                            <motion.div
                                key="intro-left"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="relative z-10 flex flex-col items-center justify-center p-6 text-center h-full w-full"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    className="w-24 h-24 bg-white md:bg-stone-900 rounded-full flex items-center justify-center mb-8 shadow-xl"
                                >
                                    <ChefHat className="w-12 h-12 text-stone-900 md:text-white" />
                                </motion.div>

                                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                                    Vision Chef
                                </h1>
                                <p className="text-stone-400 md:text-stone-500 text-lg max-w-sm mb-12 leading-relaxed">
                                    Thợ nấu ăn AI. Biến tủ lạnh của bạn thành thực đơn nhà hàng 5 sao.
                                </p>

                                {/* Mobile Intro Buttons (Hidden on Desktop) */}
                                <div className="flex flex-col gap-4 w-full max-w-xs md:hidden">
                                    <button
                                        onClick={startCamera}
                                        className="w-full py-4 bg-white text-stone-900 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-stone-200 transition-all active:scale-95 shadow-lg"
                                    >
                                        <Camera className="w-5 h-5" /> Quét Ngay
                                    </button>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full py-4 bg-transparent border border-stone-700 text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-stone-800 transition-all active:scale-95"
                                    >
                                        <Upload className="w-5 h-5" /> Tải Ảnh
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* 2. CAMERA STATE (Left) */}
                        {mode === 'camera' && (
                            <motion.div
                                key="camera-left"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 bg-black flex flex-col"
                            >
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay Controls */}
                                <div className="absolute inset-0 flex flex-col justify-between p-6 z-30">
                                    <div className="flex justify-between items-start">
                                        <button onClick={reset} className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors">
                                            <X className="w-6 h-6" />
                                        </button>
                                        <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 border border-white/10">
                                            <ScanLine className="w-4 h-4 animate-pulse text-red-500" />
                                            Scanning
                                        </div>
                                    </div>

                                    <div className="flex justify-center items-center pb-8">
                                        <button
                                            onClick={captureImage}
                                            className="w-20 h-20 bg-transparent rounded-full border-4 border-white flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95"
                                        >
                                            <div className="w-16 h-16 bg-white rounded-full" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* 3. PREVIEW STATE (Left) */}
                        {(mode === 'preview' || mode === 'results' || isAnalyzing) && capturedImage && (
                            <motion.div
                                key="preview-left"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-20 flex flex-col bg-black md:bg-stone-100"
                            >
                                <div className="relative flex-1 bg-black md:bg-transparent md:p-8 flex items-center justify-center overflow-hidden">
                                    {/* Image Preview */}
                                    <img src={capturedImage} alt="Preview" className="w-full h-full object-contain md:object-cover md:rounded-2xl md:shadow-lg opacity-90 md:opacity-100" />

                                    {/* Scanning Animation */}
                                    {isAnalyzing && (
                                        <motion.div
                                            initial={{ top: "0%" }}
                                            animate={{ top: "100%" }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute left-0 right-0 h-1 bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.8)] z-30"
                                        />
                                    )}
                                </div>

                                {/* Mobile Control Bar (Hidden on Desktop) */}
                                <div className="p-6 bg-black border-t border-white/10 flex items-center justify-between gap-4 md:hidden">
                                    {!isAnalyzing && mode !== 'results' && (
                                        <>
                                            <button onClick={reset} className="p-4 text-stone-400 hover:text-white transition-colors">
                                                <RefreshCw className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={analyzeImage}
                                                className="flex-1 py-4 bg-white text-black rounded-full font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                                            >
                                                <Sparkles className="w-5 h-5" /> Phân Tích
                                            </button>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- RIGHT SIDE: CONTROLS & RESULTS (Desktop Only) --- */}
                <div className={`hidden md:flex md:w-1/2 md:flex-col md:p-12 md:bg-white transition-all duration-500 ${mode === 'results' ? 'justify-start' : 'justify-center'}`}>

                    {/* Desktop Intro Controls */}
                    {mode === 'intro' && (
                        <div className="space-y-8 max-w-md mx-auto w-full">
                            <h2 className="text-2xl font-bold border-b-2 border-black pb-4 inline-block">Bắt đầu.</h2>
                            <p className="text-stone-500">Chọn cách bạn muốn cung cấp nguyên liệu:</p>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={startCamera}
                                    className="h-40 bg-stone-50 border-2 border-stone-100 hover:border-black rounded-2xl flex flex-col items-center justify-center gap-4 transition-all group"
                                >
                                    <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                        <Camera className="w-8 h-8 text-stone-900" />
                                    </div>
                                    <span className="font-bold text-stone-900">Dùng Webcam</span>
                                </button>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="h-40 bg-stone-50 border-2 border-stone-100 hover:border-black rounded-2xl flex flex-col items-center justify-center gap-4 transition-all group"
                                >
                                    <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                        <Upload className="w-8 h-8 text-stone-900" />
                                    </div>
                                    <span className="font-bold text-stone-900">Tải Ảnh Lên</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Desktop Preview Controls */}
                    {mode === 'preview' && (
                        <div className="space-y-8 max-w-md mx-auto w-full text-center">
                            <h2 className="text-3xl font-black mb-2">Ảnh đã sẵn sàng.</h2>
                            <p className="text-stone-500 mb-8">AI sẽ quét và nhận diện nguyên liệu ngay lập tức.</p>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={reset}
                                    className="px-6 py-4 rounded-full font-bold text-stone-500 hover:bg-stone-100 transition-colors flex items-center gap-2"
                                >
                                    <RefreshCw className="w-5 h-5" /> Chụp Lại
                                </button>
                                <button
                                    onClick={analyzeImage}
                                    disabled={isAnalyzing}
                                    className="px-8 py-4 bg-black text-white rounded-full font-bold flex items-center gap-2 hover:bg-stone-800 transition-all shadow-xl hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                                    {isAnalyzing ? 'Đang Phân Tích...' : 'Phân Tích Ngay'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Results View (Desktop & Mobile) */}
                    {mode === 'results' && result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full h-full flex flex-col md:block" // Mobile full height
                        >
                            {/* Mobile specific container styles are handled by fixed positioning below. 
                                This block renders for Desktop nicely in the right column. 
                            */}
                            <div className="hidden md:block h-full overflow-y-auto pr-2 custom-scrollbar">
                                <div className="flex justify-between items-center mb-8 sticky top-0 bg-white z-10 py-4 border-b border-stone-100">
                                    <h2 className="text-2xl font-black flex items-center gap-2">
                                        <Sparkles className="w-6 h-6 text-stone-900" />
                                        Thực Đơn Gợi Ý
                                    </h2>
                                    <button onClick={reset} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Nguyên Liệu Tìm Thấy</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {result.ingredients.map((ing, i) => (
                                                <span key={i} className="px-3 py-1 bg-stone-100 text-stone-900 rounded-full text-sm font-medium border border-stone-200">
                                                    {ing}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Món Ngon Cho Bạn</h3>
                                        <div className="grid gap-4">
                                            {result.suggestions.map((dish, i) => (
                                                <div key={i} className="group p-5 rounded-2xl border border-stone-200 hover:border-black transition-colors bg-white hover:shadow-lg cursor-pointer">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="text-lg font-bold font-serif group-hover:underline">
                                                            {dish.name}
                                                        </h4>
                                                        <ChefHat className="w-5 h-5 text-stone-300 group-hover:text-black transition-colors" />
                                                    </div>
                                                    <p className="text-stone-600 text-sm leading-relaxed mb-4">
                                                        {dish.description}
                                                    </p>
                                                    <div className="flex items-center text-sm font-bold text-stone-900 gap-1 group-hover:gap-2 transition-all">
                                                        Xem công thức <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* --- MOBILE RESULTS SHEET (Slide Up) --- */}
            <AnimatePresence>
                {mode === 'results' && result && (
                    <motion.div
                        key="results-mobile"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 bg-white text-stone-900 flex flex-col md:hidden"
                    >
                        {/* Header */}
                        <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                            <h2 className="text-xl font-black font-serif flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-stone-900" />
                                Kết Quả
                            </h2>
                            <button onClick={reset} className="p-2 bg-stone-100 rounded-full">
                                <X className="w-6 h-6 text-stone-600" />
                            </button>
                        </div>

                        {/* Content Scroll */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Ingredients Section */}
                            <div>
                                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Nguyên Liệu</h3>
                                <div className="flex flex-wrap gap-2">
                                    {result.ingredients.map((ing, i) => (
                                        <span key={i} className="px-4 py-2 bg-stone-100 text-stone-900 rounded-full font-medium border border-stone-200">
                                            {ing}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Recipes Section */}
                            <div>
                                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Gợi Ý</h3>
                                <div className="space-y-4">
                                    {result.suggestions.map((dish, i) => (
                                        <div key={i} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-lg font-bold font-serif">
                                                    {dish.name}
                                                </h4>
                                                <ChefHat className="w-5 h-5 text-stone-300" />
                                            </div>
                                            <p className="text-stone-600 text-sm leading-relaxed mb-4">
                                                {dish.description}
                                            </p>
                                            <button className="w-full py-3 rounded-xl border border-stone-200 font-bold hover:bg-stone-50 transition-colors">
                                                Xem Chi Tiết
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden Input/Canvas */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
            />
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}
