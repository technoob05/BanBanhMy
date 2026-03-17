"use client";

import { useStore } from "@/lib/store";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotalPrice, placeOrder, user } = useStore();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const totalPrice = getTotalPrice();
    const shippingFee = totalPrice > 200000 ? 0 : 30000;
    const finalTotal = totalPrice + (items.length > 0 ? shippingFee : 0);

    const handleCheckout = async () => {
        if (!user) {
            alert("Vui lòng đăng nhập để thanh toán!");
            return;
        }

        setIsCheckingOut(true);
        
        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const order = placeOrder();
        
        if (order) {
            setIsSuccess(true);
            
            // Confetti Explosion 💥
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);

            // Redirect after a while
            setTimeout(() => {
                router.push(`/order-tracking?id=${order.id}`);
            }, 4000);
        }
        
        setIsCheckingOut(false);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8"
                >
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                </motion.div>
                <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-black text-gray-900 mb-2 text-center"
                >
                    Đặt Hàng Thành Công!
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-500 mb-12 text-center max-w-sm"
                >
                    Đơn hàng của bạn đang được chuẩn bị. Chúng tôi sẽ chuyển bạn đến trang theo dõi ngay bây giờ...
                </motion.p>
                <div className="flex gap-4">
                     <div className="w-2 h-2 bg-[#C8956C] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                     <div className="w-2 h-2 bg-[#C8956C] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                     <div className="w-2 h-2 bg-[#C8956C] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 py-28 px-4">
            <div className="container max-w-5xl mx-auto">
                <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
                    <ShoppingBag className="w-8 h-8 text-[#C8956C]" />
                    Giỏ Hàng Của Bạn
                </h1>

                {items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-white rounded-3xl shadow-sm border border-stone-100"
                    >
                        <div className="text-6xl mb-4">🥣</div>
                        <h2 className="text-2xl font-bold text-stone-800 mb-2">Chưa có gì trong tô!</h2>
                        <p className="text-stone-500 mb-8">Hãy thêm vài gói mì để bữa ăn thêm đậm đà nhé.</p>
                        <Link href="/products">
                            <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-transform">
                                Mua Sắm Ngay
                            </button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm flex gap-4 items-center"
                                    >
                                        <div className="relative w-20 h-20 bg-stone-50 rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-bold text-stone-900">{item.name}</h3>
                                            <p className="text-[#C8956C] font-bold">{item.price.toLocaleString()}đ</p>
                                        </div>

                                        <div className="flex items-center gap-3 bg-stone-50 rounded-full px-3 py-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="font-bold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Summary */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-lg sticky top-28">
                                <h3 className="font-bold text-xl mb-6">Tổng Quan Đơn Hàng</h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-stone-600">
                                        <span>Tạm tính</span>
                                        <span>{totalPrice.toLocaleString()}đ</span>
                                    </div>
                                    <div className="flex justify-between text-stone-600">
                                        <span>Phí vận chuyển</span>
                                        <span>{shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()}đ`}</span>
                                    </div>
                                    {shippingFee > 0 && (
                                        <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md inline-block">
                                            Mua thêm {(200000 - totalPrice).toLocaleString()}đ để freeship
                                        </div>
                                    )}
                                </div>

                                <div className="border-t border-stone-100 pt-4 mb-8">
                                    <div className="flex justify-between font-bold text-xl">
                                        <span>Tổng cộng</span>
                                        <span className="text-[#C8956C]">{finalTotal.toLocaleString()}đ</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="w-full bg-gray-900 text-white py-4 flex items-center justify-center gap-2 text-lg rounded-2xl shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isCheckingOut ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>Thanh Toán Ngay <ArrowRight className="w-5 h-5" /></>
                                    )}
                                </button>

                                <p className="text-center text-xs text-stone-400 mt-4">
                                    Đảm bảo chất lượng 100%. Hoàn tiền nếu không hài lòng.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
