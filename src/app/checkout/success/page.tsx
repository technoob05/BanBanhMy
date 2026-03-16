"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Home, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function OrderSuccessPage() {
    useEffect(() => {
        // Fire confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: NodeJS.Timeout = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-center max-w-lg w-full border border-stone-100 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600" />

                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-green-200 shadow-xl">
                    <Check className="w-12 h-12 text-green-600" />
                </div>

                <h1 className="text-3xl font-black font-serif text-stone-900 mb-4">
                    Đặt Hàng Thành Công!
                </h1>

                <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                    Cảm ơn bạn đã tin tưởng Noodliverse. Đơn hàng của bạn đang được các đầu bếp chuẩn bị và sẽ giao đến trong thời gian sớm nhất! 🍜
                </p>

                <div className="space-y-3">
                    <Link href="/">
                        <button className="w-full btn-primary py-4 flex items-center justify-center gap-2 shadow-xl">
                            <Home className="w-5 h-5" /> Về Trang Chủ
                        </button>
                    </Link>
                    <Link href="/products">
                        <button className="w-full py-4 rounded-full font-bold text-stone-600 hover:bg-stone-50 transition-colors">
                            Tiếp Tục Mua Sắm
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
