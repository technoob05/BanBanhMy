"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { motion } from "framer-motion";
import { ArrowLeft, Check, CreditCard, Truck, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export default function CheckoutPage() {
    const { items, getTotalPrice, clearCart } = useCartStore();
    const router = useRouter();
    const totalPrice = getTotalPrice();
    const shippingFee = totalPrice > 200000 ? 0 : 30000;
    const finalTotal = totalPrice + shippingFee;
    const [isProcessing, setIsProcessing] = useState(false);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        note: ""
    });

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
                    <Link href="/products" className="text-amber-600 font-bold hover:underline">
                        Quay lại mua sắm
                    </Link>
                </div>
            </div>
        );
    }

    const handleOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Success
        clearCart();
        toast.success("Đặt hàng thành công! 🎉");
        router.push("/checkout/success");
    };

    return (
        <div className="min-h-screen bg-stone-50 py-28 px-4">
            <div className="container max-w-6xl mx-auto">
                <Link href="/cart" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-8 font-medium">
                    <ArrowLeft className="w-5 h-5" /> Quay lại giỏ hàng
                </Link>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Checkout Form */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Section 1: Shipping Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-stone-100"
                        >
                            <h2 className="text-xl font-bold flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold">1</div>
                                Thông Tin Giao Hàng
                            </h2>

                            <form id="checkout-form" onSubmit={handleOrder} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="font-bold text-sm text-stone-600">Họ và tên</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Nguyễn Văn A"
                                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-bold text-sm text-stone-600">Số điện thoại</label>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="0912..."
                                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                            value={form.phone}
                                            onChange={e => setForm({ ...form, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-sm text-stone-600">Địa chỉ nhận hàng</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
                                        <input
                                            required
                                            type="text"
                                            placeholder="Số nhà, tên đường, phường/xã..."
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                            value={form.address}
                                            onChange={e => setForm({ ...form, address: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-sm text-stone-600">Ghi chú (Tùy chọn)</label>
                                    <textarea
                                        placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all h-24 resize-none"
                                        value={form.note}
                                        onChange={e => setForm({ ...form, note: e.target.value })}
                                    />
                                </div>
                            </form>
                        </motion.div>

                        {/* Section 2: Payment Method */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-stone-100"
                        >
                            <h2 className="text-xl font-bold flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold">2</div>
                                Phương Thức Thanh Toán
                            </h2>

                            <div className="space-y-3">
                                <label className="flex items-center gap-4 p-4 border border-amber-200 bg-amber-50/50 rounded-xl cursor-pointer ring-2 ring-amber-500 ring-offset-2">
                                    <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-amber-600 accent-amber-600" />
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <Truck className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <span className="font-bold block text-stone-900">Thanh toán khi nhận hàng (COD)</span>
                                        <span className="text-sm text-stone-500">Thanh toán tiền mặt cho shipper</span>
                                    </div>
                                </label>

                                <label className="flex items-center gap-4 p-4 border border-stone-200 rounded-xl cursor-not-allowed opacity-60">
                                    <input type="radio" name="payment" disabled className="w-5 h-5" />
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <CreditCard className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <span className="font-bold block text-stone-900">Chuyển khoản (Bảo trì)</span>
                                        <span className="text-sm text-stone-500">Hệ thống đang nâng cấp</span>
                                    </div>
                                </label>
                            </div>
                        </motion.div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-28 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white p-6 rounded-3xl shadow-lg border border-stone-100"
                            >
                                <h3 className="font-bold text-lg mb-6">Đơn Hàng ({items.length} món)</h3>

                                <div className="max-h-60 overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
                                    {items.map(item => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="relative w-16 h-16 bg-stone-50 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                <span className="absolute bottom-0 right-0 bg-stone-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-tl-lg">
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1 text-sm">
                                                <p className="font-bold line-clamp-2">{item.name}</p>
                                                <p className="text-stone-500">{(item.price * item.quantity).toLocaleString()}đ</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-stone-100 pt-4 space-y-2 mb-6 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Tạm tính</span>
                                        <span className="font-bold">{totalPrice.toLocaleString()}đ</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Phí vận chuyển</span>
                                        <span className="font-bold">{shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()}đ`}</span>
                                    </div>
                                    <div className="border-t border-dashed border-stone-200 pt-2 flex justify-between text-lg font-black text-amber-600">
                                        <span>Tổng thanh toán</span>
                                        <span>{finalTotal.toLocaleString()}đ</span>
                                    </div>
                                </div>

                                <button
                                    form="checkout-form"
                                    disabled={isProcessing}
                                    className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-2 font-bold shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Đang xử lý...
                                        </>
                                    ) : (
                                        <>
                                            Đặt Hàng Ngay <Check className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
