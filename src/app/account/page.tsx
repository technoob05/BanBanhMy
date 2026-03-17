"use client";

import { motion } from "framer-motion";
import { User, Package, MapPin, Settings, ChevronRight, LogOut, ShoppingBag, CreditCard, Save, Calendar, Phone, Mail, User2 } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccountPage() {
    const { user, logout, orders, updateUser } = useStore();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        birthday: user?.birthday || "",
        gender: user?.gender || "khac",
        address: user?.address || "",
    });

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                    <User className="w-10 h-10 text-gray-400" />
                </div>
                <h1 className="text-2xl font-black text-gray-900 mb-2 text-center">Chào Bạn!</h1>
                <p className="text-gray-500 mb-8 text-center max-w-xs">Hãy đăng nhập để xem lịch sử mua hàng và quản lý tài khoản của bạn.</p>
                <Link href="/">
                    <button className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-transform">
                        Về Trang Chủ
                    </button>
                </Link>
            </div>
        );
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        updateUser(formData);
        setIsLoading(false);
        setIsEditing(false);
    };

    const menuItems = [
        { icon: Package, label: "Đơn hàng của tôi", desc: "Theo dõi đơn hàng & lịch sử", href: "#orders" },
        { icon: MapPin, label: "Địa chỉ nhận hàng", desc: "Quản lý địa chỉ giao hàng", href: "#profile" },
        { icon: CreditCard, label: "Phương thức thanh toán", desc: "Quản lý thẻ & ví điện tử", href: "#" },
        { icon: Settings, label: "Cài đặt tài khoản", desc: "Mật khẩu, thông báo, ...", href: "#profile" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container max-w-4xl mx-auto px-4">
                {/* Profile Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 mb-8 border border-gray-100 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8956C]/5 rounded-full -mr-16 -mt-16" />
                    
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10 text-center md:text-left">
                        <div className="w-24 h-24 bg-gray-900 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl shrink-0">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-black text-gray-900 mb-1">{user.name}</h1>
                            <p className="text-gray-500 font-medium mb-3">{user.email}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <span className="px-3 py-1 bg-[#C8956C]/10 text-[#C8956C] text-[10px] font-black uppercase tracking-wider rounded-full">
                                    Thành viên Vàng
                                </span>
                                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-wider rounded-full">
                                    Tài khoản đã xác minh
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-900 rounded-3xl p-6 text-white text-center">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Đơn hàng</p>
                                <p className="text-3xl font-black">{orders.length}</p>
                            </div>
                            <div className="bg-white rounded-3xl p-6 text-center border border-gray-100 shadow-sm">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">N-Points</p>
                                <p className="text-3xl font-black text-[#C8956C]">1,250</p>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 divide-y divide-gray-50 overflow-hidden">
                            {menuItems.map((item, idx) => (
                                <Link 
                                    key={idx} 
                                    href={item.href}
                                    className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gray-100 rounded-2xl group-hover:bg-[#C8956C]/10 group-hover:text-[#C8956C] transition-colors">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900 text-sm">{item.label}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#C8956C] transition-all group-hover:translate-x-1" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Personal Information Section */}
                        <section id="profile" className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                    <User2 className="w-6 h-6 text-[#C8956C]" />
                                    Thông Tin Cá Nhân
                                </h2>
                                {!isEditing && (
                                    <button 
                                        onClick={() => setIsEditing(true)}
                                        className="text-sm font-bold text-[#C8956C] hover:underline"
                                    >
                                        Chỉnh sửa
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                            <User className="w-3.5 h-3.5" /> Họ và tên
                                        </label>
                                        <input 
                                            type="text" 
                                            disabled={!isEditing}
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C8956C]/20 disabled:opacity-60 font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                            <Mail className="w-3.5 h-3.5" /> Email
                                        </label>
                                        <input 
                                            type="email" 
                                            disabled
                                            value={formData.email}
                                            className="w-full px-5 py-4 bg-gray-100 border border-transparent rounded-2xl font-bold text-gray-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                            <Phone className="w-3.5 h-3.5" /> Số điện thoại
                                        </label>
                                        <input 
                                            type="tel" 
                                            disabled={!isEditing}
                                            placeholder="Chưa cập nhật"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C8956C]/20 disabled:opacity-60 font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5" /> Ngày sinh
                                        </label>
                                        <input 
                                            type="date" 
                                            disabled={!isEditing}
                                            value={formData.birthday}
                                            onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C8956C]/20 disabled:opacity-60 font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Giới tính</label>
                                    <div className="flex gap-4">
                                        {[
                                            { id: 'nam', label: 'Nam' },
                                            { id: 'nu', label: 'Nữ' },
                                            { id: 'khac', label: 'Khác' }
                                        ].map((g) => (
                                            <button
                                                key={g.id}
                                                type="button"
                                                disabled={!isEditing}
                                                onClick={() => setFormData({...formData, gender: g.id as any})}
                                                className={`flex-1 py-4 rounded-2xl font-bold transition-all ${
                                                    formData.gender === g.id 
                                                        ? 'bg-gray-900 text-white shadow-lg' 
                                                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                                } disabled:opacity-60`}
                                            >
                                                {g.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5" /> Địa chỉ giao hàng
                                    </label>
                                    <textarea 
                                        rows={3}
                                        disabled={!isEditing}
                                        placeholder="Chưa có địa chỉ"
                                        value={formData.address}
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C8956C]/20 disabled:opacity-60 font-bold resize-none"
                                    />
                                </div>

                                {isEditing && (
                                    <div className="flex gap-4 pt-4">
                                        <button 
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="flex-1 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
                                        >
                                            Hủy
                                        </button>
                                        <button 
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex-1 py-4 bg-[#C8956C] text-white font-bold rounded-2xl shadow-xl shadow-[#C8956C]/20 hover:bg-[#A67C52] transition-all flex items-center justify-center gap-2"
                                        >
                                            {isLoading ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <><Save className="w-5 h-5" /> Lưu thay đổi</>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </section>

                        {/* Recent Orders Section */}
                        <div id="orders">
                            <div className="flex justify-between items-end mb-6 px-4">
                                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                    <ShoppingBag className="w-6 h-6 text-[#C8956C]" />
                                    Đơn Hàng Gần Đây
                                </h2>
                                {orders.length > 5 && (
                                    <Link href="#" className="text-xs font-bold text-[#C8956C] hover:underline">Xem tất cả</Link>
                                )}
                            </div>

                            <div className="space-y-4">
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <motion.div
                                            key={order.id}
                                            whileHover={{ y: -4 }}
                                            className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100 flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center relative">
                                                    <Package className="w-7 h-7 text-gray-400" />
                                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8956C] rounded-full border-2 border-white" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{order.id}</p>
                                                    <p className="font-black text-gray-900 text-sm">
                                                        {order.items.length} món • <span className="text-[#C8956C]">{order.total.toLocaleString()}đ</span>
                                                    </p>
                                                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                                        order.status === 'delivered' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                                                    }`}>
                                                        {order.status === 'delivered' ? 'Đã giao' : 'Đang xử lý'}
                                                    </span>
                                                </div>
                                            </div>
                                            <Link href={`/order-tracking?id=${order.id}`}>
                                                <button className="px-5 py-3 bg-gray-900 text-white rounded-2xl text-xs font-black hover:bg-[#C8956C] transition-colors active:scale-90">
                                                    Theo dõi
                                                </button>
                                            </Link>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="bg-white rounded-[2rem] p-12 text-center border-2 border-dashed border-gray-100">
                                        <Package className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                                        <p className="text-gray-400 font-bold">Chưa có đơn hàng nào</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Logout */}
                        <button 
                            onClick={() => { logout(); router.push("/"); }}
                            className="w-full flex items-center justify-center gap-3 py-6 bg-red-50 text-red-600 font-black rounded-[2rem] hover:bg-red-100 transition-colors shadow-sm"
                        >
                            <LogOut className="w-5 h-5" /> Đăng xuất tài khoản
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
