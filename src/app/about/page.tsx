"use client";

import { motion } from "framer-motion";
import { CheckCircle2, History, Award, Users } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 z-10" />
                <div className="absolute inset-0">
                    <Image
                        src="https://placehold.co/1920x1080/png?text=Our+Story"
                        alt="About Hero"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="container relative z-20 text-center text-white space-y-6">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-outfit)]"
                    >
                        Chuyện Của Mì
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl max-w-2xl mx-auto text-white/90"
                    >
                        Hành trình mang hương vị mì ngon từ khắp thế giới đến căn bếp của bạn.
                    </motion.p>
                </div>
            </section>

            {/* Grid */}
            <section className="py-20 container">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold font-[family-name:var(--font-outfit)]">Sứ Mệnh Của Chúng Tôi</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            MìMart ra đời với mong muốn định nghĩa lại &quot;mì ăn liền&quot;. Không chỉ là món ăn nhanh, chúng tôi tin rằng mỗi gói mì đều mang trong mình một câu chuyện văn hóa ẩm thực riêng biệt.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Cung cấp 100+ loại mì tuyển chọn",
                                "Đảm bảo nguồn gốc xuất xứ rõ ràng",
                                "Dịch vụ giao hàng siêu tốc 30 phút",
                                "Hỗ trợ tư vấn món ăn từ Chuyên gia & AI"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4 mt-8">
                            <div className="bg-muted aspect-square rounded-2xl flex items-center justify-center p-6 text-center">
                                <History className="w-10 h-10 text-primary mb-2 mx-auto" />
                                <h4 className="font-bold">10 Năm <br />Phát Triển</h4>
                            </div>
                            <div className="bg-muted aspect-square rounded-2xl flex items-center justify-center p-6 text-center">
                                <Users className="w-10 h-10 text-primary mb-2 mx-auto" />
                                <h4 className="font-bold">1M+ <br />Khách Hàng</h4>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-muted aspect-square rounded-2xl flex items-center justify-center p-6 text-center">
                                <Award className="w-10 h-10 text-primary mb-2 mx-auto" />
                                <h4 className="font-bold">Top 1 <br />Thương Hiệu</h4>
                            </div>
                            <div className="bg-muted aspect-square rounded-2xl flex items-center justify-center p-6 text-center">
                                <CheckCircle2 className="w-10 h-10 text-primary mb-2 mx-auto" />
                                <h4 className="font-bold">99% <br />Hài Lòng</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
