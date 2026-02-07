"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
            <div className="text-center space-y-6 max-w-md">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-9xl mb-4 select-none"
                >
                    🍜
                </motion.div>

                <h1 className="text-4xl font-black font-serif text-stone-900">
                    Úi, Mì Đổ Rồi!
                </h1>

                <p className="text-lg text-stone-600">
                    Trang bạn tìm không tồn tại hoặc đã bị "ăn mất" rồi.
                </p>

                <div className="flex flex-col gap-3 pt-4">
                    <Link href="/">
                        <button className="w-full btn-primary flex items-center justify-center gap-2">
                            <Home className="w-5 h-5" />
                            Về Trang Chủ
                        </button>
                    </Link>
                    <Link href="/products">
                        <button className="w-full py-3 rounded-full border border-stone-300 hover:bg-stone-100 font-bold transition-colors flex items-center justify-center gap-2">
                            <Search className="w-5 h-5" />
                            Tìm Mì Khác
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
