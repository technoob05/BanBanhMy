"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ChefHat, Loader2, ArrowRight } from "lucide-react";
import Image from "next/image";

export function FridgeScanner() {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setResult(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleScan = async () => {
        if (!image) return;
        setLoading(true);
        try {
            const res = await fetch("/api/fridge-scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image }),
            });
            const data = await res.json();
            setResult(data.suggestion);
        } catch (error) {
            console.error(error);
            setResult("Có lỗi xảy ra khi phân tích ảnh. Vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass rounded-3xl p-8 border border-white/20 shadow-xl max-w-2xl mx-auto my-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 font-[family-name:var(--font-outfit)]">
                    Pha Chế Mì Cùng AI <span className="text-primary">MasterChef</span>
                </h2>
                <p className="text-muted-foreground">
                    Chụp ảnh nguyên liệu bạn có, AI sẽ gợi ý công thức mì đỉnh cao!
                </p>
            </div>

            <div className="space-y-8">
                {/* Upload Area */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`
            relative aspect-video rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden group
            ${image ? 'border-primary/50' : 'border-border hover:border-primary/50 hover:bg-muted/50'}
          `}
                >
                    {image ? (
                        <Image
                            src={image}
                            alt="Ingredients"
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-4">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Camera className="w-8 h-8" />
                            </div>
                            <p>Nhấn để chụp hoặc tải ảnh lên</p>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*"
                        className="hidden"
                    />
                </div>

                {/* Action Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleScan}
                        disabled={!image || loading}
                        className={`
              btn-gradient px-8 py-4 text-lg flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed
              ${loading ? 'animate-pulse' : ''}
            `}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                Đang Phân Tích...
                            </>
                        ) : (
                            <>
                                <ChefHat className="w-6 h-6" />
                                Gợi Ý Món Ngon
                            </>
                        )}
                    </button>
                </div>

                {/* Result Area */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-card rounded-2xl p-6 border border-border shadow-lg"
                        >
                            <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-primary">
                                <Sparkles className="w-5 h-5" />
                                Gợi Ý Từ Đầu Bếp AI:
                            </h3>
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                <p className="whitespace-pre-line leading-relaxed">
                                    {result}
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-border flex justify-end">
                                <button className="text-primary font-bold flex items-center gap-2 hover:underline">
                                    Mua Nguyên Liệu Ngay <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

import { Sparkles } from "lucide-react";
