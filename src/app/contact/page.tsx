"use client";

import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen py-20 px-4">
            <div className="container max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-12 bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">

                    {/* Contact Info */}
                    <div className="bg-gradient-to-br from-primary to-secondary p-12 text-white flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-6 font-[family-name:var(--font-outfit)]">
                                Liên Hệ Với MìMart
                            </h1>
                            <p className="text-white/80 text-lg mb-12">
                                Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn.
                                Hãy để lại lời nhắn hoặc ghé thăm cửa hàng!
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Hotline</h3>
                                        <p className="text-white/80">1900 1234 (8:00 - 22:00)</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Email</h3>
                                        <p className="text-white/80">support@mimart.vn</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Địa Chỉ</h3>
                                        <p className="text-white/80">123 Đường ABC, Quận 1, TP.HCM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12">
                            <div className="flex gap-4">
                                {/* Social icons */}
                                <div className="w-10 h-10 bg-white/20 rounded-full" />
                                <div className="w-10 h-10 bg-white/20 rounded-full" />
                                <div className="w-10 h-10 bg-white/20 rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-12 bg-background/50">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold">Họ & Tên</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl bg-muted border-transparent focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                        placeholder="Nguyễn Văn A"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 rounded-xl bg-muted border-transparent focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                        placeholder="example@mail.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold">Chủ Đề</label>
                                <select className="w-full px-4 py-3 rounded-xl bg-muted border-transparent focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none">
                                    <option>Tư vấn sản phẩm</option>
                                    <option>Khiếu nại đơn hàng</option>
                                    <option>Hợp tác kinh doanh</option>
                                    <option>Khác</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold">Nội Dung</label>
                                <textarea
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl bg-muted border-transparent focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                    placeholder="Nhập nội dung tin nhắn..."
                                />
                            </div>

                            <button className="w-full btn-gradient py-4 rounded-xl font-bold flex items-center justify-center gap-2 group">
                                Gửi Tin Nhắn
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
