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
                <div className="space-y-4">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Noodliverse ra đời với mong muốn mang hương vị ẩm thực Việt Nam vào từng gói mì. 
                        Chúng tôi tin rằng mì ăn liền không chỉ là một bữa ăn nhanh, mà còn có thể trở thành trải nghiệm khám phá văn hóa ẩm thực ba miền Bắc – Trung – Nam.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Mỗi sản phẩm được phát triển với cảm hứng từ hương vị vùng miền, giúp bạn thưởng thức tinh thần ẩm thực Việt Nam một cách tiện lợi, hiện đại và sáng tạo.
                    </p>
                </div>

                <div className="space-y-4 pt-4">
                    <h3 className="text-xl font-bold">Cam kết của chúng tôi</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            "Đại diện 3 hương vị mì đặc trưng Bắc – Trung – Nam",
                            "Hương vị được phát triển theo phong cách ẩm thực Việt hiện đại",
                            "Nguyên liệu chọn lọc, đảm bảo chất lượng và an toàn thực phẩm",
                            "Trải nghiệm mì mới mẻ dành cho thế hệ trẻ và gia đình"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-medium">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                    { label: "Bắc – Trung – Nam trong một thương hiệu mì.", title: "3 Hương Vị Đặc Trưng", icon: History },
                    { label: "Mang tinh thần ẩm thực Việt vào mì ăn liền.", title: "1 Ý Tưởng Ẩm Thực Việt", icon: Award },
                    { label: "Từ các hoạt động dùng thử và cộng đồng.", title: "100K+ Trải Nghiệm Khách Hàng", icon: Users },
                    { label: "Đánh giá tích cực từ người trải nghiệm.", title: "98% Khách Hàng Hài Lòng", icon: CheckCircle2 }
                ].map((stat, i) => (
                    <div key={i} className="bg-muted/50 p-6 rounded-3xl space-y-3 hover:bg-muted transition-colors">
                        <stat.icon className="w-8 h-8 text-primary" />
                        <h4 className="font-bold text-lg leading-tight">{stat.title}</h4>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                ))}
            </div>
                </div>
            </section>
        </div>
    );
}
