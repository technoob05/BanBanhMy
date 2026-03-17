"use client";

import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, Clock, MapPin, ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function TrackingContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id");
    const { orders } = useStore();
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        if (orderId) {
            const foundOrder = orders.find(o => o.id === orderId);
            setOrder(foundOrder);
        } else if (orders.length > 0) {
            setOrder(orders[0]);
        }
    }, [orderId, orders]);

    if (!order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
                <Package className="w-16 h-16 text-gray-300 mb-4 animate-bounce" />
                <h1 className="text-2xl font-black text-gray-900 mb-2">Không tìm thấy đơn hàng</h1>
                <p className="text-gray-500 mb-8 text-center max-w-xs">Có vẻ như bạn chưa có đơn hàng nào hoặc mã đơn hàng không hợp lệ.</p>
                <Link href="/products">
                    <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-transform">
                        Mua sắm ngay
                    </button>
                </Link>
            </div>
        );
    }

    const steps = [
        { icon: Clock, label: "Đã tiếp nhận", status: "pending", desc: "Đơn hàng của bạn đã được hệ thống ghi nhận." },
        { icon: Package, label: "Đang chuẩn bị", status: "processing", desc: "Chúng tôi đang đóng gói những gói mì tươi ngon nhất." },
        { icon: Truck, label: "Đang giao hàng", status: "shipping", desc: "Shipper đang trên đường mang Noodliverse đến bạn." },
        { icon: CheckCircle, label: "Đã giao", status: "delivered", desc: "Chúc bạn ngon miệng với Noodliverse!" },
    ];

    const currentStepIndex = steps.findIndex(s => s.status === order.status);

    return (
        <div className="container max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <Link href="/account" className="p-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl font-black text-gray-900">Chi Tiết Vận Chuyển</h1>
                <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Order ID Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 mb-6 border border-gray-100"
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Mã đơn hàng</p>
                        <h2 className="text-xl font-black text-gray-900">{order.id}</h2>
                    </div>
                    <div className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase tracking-wider">
                        {order.status === 'shipping' ? 'Đang giao' : order.status === 'delivered' ? 'Đã nhận' : 'Đang xử lý'}
                    </div>
                </div>
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Đặt lúc {new Date(order.date).toLocaleString('vi-VN')}</span>
                </div>
            </motion.div>

            {/* Tracking Visual */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 mb-6 border border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Truck className="w-32 h-32" />
                </div>
                
                <div className="relative z-10 space-y-10">
                    {steps.map((step, idx) => {
                        const isCompleted = idx <= currentStepIndex;
                        const isCurrent = idx === currentStepIndex;
                        const Icon = step.icon;

                        return (
                            <div key={idx} className="flex gap-4 relative">
                                {/* Line */}
                                {idx !== steps.length - 1 && (
                                    <div className={`absolute left-6 top-10 w-0.5 h-10 -ml-px ${isCompleted && idx < currentStepIndex ? 'bg-gray-900' : 'bg-gray-100'}`} />
                                )}
                                
                                <motion.div 
                                    initial={false}
                                    animate={{ 
                                        scale: isCurrent ? 1.2 : 1,
                                        backgroundColor: isCompleted ? "#111827" : "#F3F4F6",
                                        color: isCompleted ? "#FFFFFF" : "#9CA3AF"
                                    }}
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center z-10 shadow-lg"
                                >
                                    <Icon className="w-6 h-6" />
                                </motion.div>

                                <div className="flex-1 pt-1">
                                    <h3 className={`font-black text-sm ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                                        {step.label}
                                    </h3>
                                    <p className="text-xs text-gray-500 leading-relaxed mt-1">
                                        {step.desc}
                                    </p>
                                    {isCurrent && (
                                        <motion.div 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold text-[#C8956C] bg-[#C8956C]/10 px-3 py-1 rounded-full"
                                        >
                                            <div className="w-1.5 h-1.5 bg-[#C8956C] rounded-full animate-ping" />
                                            Cập nhật lúc {new Date().toLocaleTimeString()}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-2xl mb-6">
                <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-white/10 rounded-2xl">
                        <MapPin className="w-6 h-6 text-[#C8956C]" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-1">Địa chỉ giao hàng</h4>
                        <p className="text-sm font-medium leading-relaxed">
                            {order.address || "123 Đường Noodliverse, Phường Mì Tôm, Quận Hải Sản, TP. Hồ Chí Minh"}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Dự kiến giao</p>
                        <p className="text-sm font-black">Hôm nay, 18:30</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Shipper</p>
                        <p className="text-sm font-black">Nguyễn Văn A</p>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
                <h3 className="font-black text-gray-900 mb-4">Tóm tắt đơn hàng</h3>
                <div className="space-y-3">
                    {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">{item.quantity}x {item.name}</span>
                            <span className="font-bold text-gray-900">{ (item.price * item.quantity).toLocaleString() }đ</span>
                        </div>
                    ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-50 flex justify-between items-center">
                    <span className="font-black text-gray-900">Tổng cộng</span>
                    <span className="text-xl font-black text-[#C8956C]">{order.total.toLocaleString()}đ</span>
                </div>
            </div>
            
            {/* Back to Home CTA */}
            <Link href="/" className="mt-8 block">
                <button className="w-full flex items-center justify-center gap-3 py-5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-2xl transition-all active:scale-95">
                    Quay lại trang chủ <ArrowRight className="w-5 h-5" />
                </button>
            </Link>
        </div>
    );
}

export default function OrderTrackingPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-0">
            <Suspense fallback={
                <div className="min-h-screen flex flex-col items-center justify-center p-4">
                    <div className="w-10 h-10 border-4 border-[#C8956C]/20 border-t-[#C8956C] rounded-full animate-spin mb-4" />
                    <p className="text-gray-400 font-bold">Đang tải thông tin đơn hàng...</p>
                </div>
            }>
                <TrackingContent />
            </Suspense>
        </div>
    );
}
