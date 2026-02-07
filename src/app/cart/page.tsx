"use client";

import { useCartStore } from "@/lib/store";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    const totalPrice = getTotalPrice();
    const shippingFee = totalPrice > 200000 ? 0 : 30000;
    const finalTotal = totalPrice + (items.length > 0 ? shippingFee : 0);

    return (
        <div className="min-h-screen bg-stone-50 py-28 px-4">
            <div className="container max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold font-serif mb-8 flex items-center gap-3">
                    <ShoppingBag className="w-8 h-8 text-amber-600" />
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
                            <button className="btn-primary">
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
                                            <p className="text-amber-600 font-bold">{item.price.toLocaleString()}đ</p>
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
                                        <span className="text-amber-600">{finalTotal.toLocaleString()}đ</span>
                                    </div>
                                </div>

                                <Link href="/checkout">
                                    <button className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-lg shadow-amber-200 shadow-xl">
                                        Thanh Toán Ngay <ArrowRight className="w-5 h-5" />
                                    </button>
                                </Link>

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
