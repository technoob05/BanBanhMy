"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Facebook, Chrome as Google, Github } from "lucide-react";
import { useEffect, useState } from "react";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-400" />
                        </button>

                        <div className="p-8 sm:p-10">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-black text-gray-900 mb-2">Xin Chào!</h2>
                                <p className="text-gray-500">Đăng nhập để trải nghiệm hương vị Noodliverse</p>
                            </div>

                            {/* Social Logins */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-colors">
                                    <Google className="w-5 h-5 text-red-500" />
                                    Google
                                </button>
                                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-colors">
                                    <Facebook className="w-5 h-5 text-blue-600" />
                                    Facebook
                                </button>
                            </div>

                            <div className="relative mb-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500 font-medium font-[family-name:var(--font-outfit)] uppercase tracking-widest text-[10px]">Hoặc với email</span>
                                </div>
                            </div>

                            {/* Form */}
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-700 uppercase ml-1">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C8956C]/20 focus:bg-white transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-700 uppercase ml-1">Mật khẩu</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C8956C]/20 focus:bg-white transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="flex items-center justify-between px-1">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#C8956C] focus:ring-[#C8956C]" />
                                        <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Ghi nhớ</span>
                                    </label>
                                    <button className="text-sm font-bold text-[#C8956C] hover:text-[#A67C52]">Quên mật khẩu?</button>
                                </div>

                                <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-black transition-all active:scale-95 mt-4">
                                    Đăng Nhập
                                </button>
                            </form>

                            <p className="text-center mt-8 text-gray-500 text-sm">
                                Chưa có tài khoản?{" "}
                                <button className="font-bold text-gray-900 hover:text-[#C8956C] underline underline-offset-4">Đăng ký ngay</button>
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
