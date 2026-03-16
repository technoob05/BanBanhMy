"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const NEWS_ITEMS = [
    {
        id: 1,
        title: "KOL 'Mỏ Khoét' Trải Nghiệm Mì Bò Cay Noodliverse",
        excerpt: "Bất ngờ với hương vị đậm đà chuẩn miền Trung, KOL Mỏ Khoét đã có những chia sẻ thú vị về dòng sản phẩm mới nhất...",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200",
        category: "Influencer",
        date: "15 Tháng 3, 2026",
        author: "Noodliverse Team",
    },
    {
        id: 2,
        title: "Sự Kiện Ra Mắt: Hành Trình Hương Vị Ba Miền",
        excerpt: "Hàng ngàn bạn trẻ đã tham gia trải nghiệm và nhận quà tại sự kiện ra mắt thương hiệu Noodliverse tại phố đi bộ...",
        image: "/images/noodliverse/Gemini_Generated_Image_6ydbgw6ydbgw6ydb.png",
        category: "Sự Kiện",
        date: "10 Tháng 3, 2026",
        author: "Marketing Dept",
    },
    {
        id: 3,
        title: "Thử Thách: 7 Ngày Khám Phá Ẩm Thực Việt",
        excerpt: "Cùng cộng đồng Noodliverse tham gia thử thách sáng tạo món ăn cùng mì ba miền để nhận ngay bộ quà tặng độc quyền...",
        image: "/images/noodliverse/Gemini_Generated_Image_l5mjlll5mjlll5mj.png",
        category: "Thử Thách",
        date: "05 Tháng 3, 2026",
        author: "Community Manager",
    },
    {
        id: 4,
        title: "Thông Điệp Từ Noodliverse: Khi Mì Ăn Liền Là Nghệ Thuật",
        excerpt: "Khám phá câu chuyện đằng sau 3 hương vị mì đặc trưng và tâm huyết của đội ngũ phát triển sản phẩm...",
        image: "/images/noodliverse/Gemini_Generated_Image_gg10k3gg10k3gg10.png",
        category: "Cộng Đồng",
        date: "01 Tháng 3, 2026",
        author: "Founder",
    },
];

export default function NewsSection() {
    return (
        <section className="section-padding bg-gradient-to-b from-white to-orange-50 overflow-hidden">
            <div className="container">

                {/* Section Header */}
                <ScrollReveal direction="up" className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-[#C8956C]/10 text-[#A67C52] rounded-full font-bold text-sm mb-4">
                        TIN TỨC & SỰ KIỆN
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                        Nhịp Sống <span className="text-[#C8956C]">Mỳ Ngon</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Cập nhật những hoạt động sôi nổi, bí quyết nấu ăn và những câu chuyện thú vị từ cộng đồng
                    </p>
                </ScrollReveal>

                {/* Featured News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {NEWS_ITEMS.map((item, idx) => (
                        <ScrollReveal
                            key={item.id}
                            direction="up"
                            delay={idx * 0.15}
                            className="group h-full"
                        >
                            <article className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-100 transform hover:-translate-y-2">
                                {/* Image Container */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-gray-900 text-xs font-bold rounded-full shadow-lg">
                                            {item.category}
                                        </span>
                                    </div>

                                    {/* Date Badge (Overlay on hover) */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center gap-4 text-white/90 text-xs">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {item.date}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                3 phút đọc
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#C8956C] transition-colors line-clamp-2 mb-3">
                                            <Link href={`/news/${item.id}`} className="focus:outline-none">
                                                <span className="absolute inset-0" aria-hidden="true" />
                                                {item.title}
                                            </Link>
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                                            {item.excerpt}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold">
                                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                                <User className="w-3.5 h-3.5 text-gray-500" />
                                            </div>
                                            {item.author}
                                        </div>

                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#C8956C]/10 text-[#C8956C] group-hover:bg-[#C8956C] group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </ScrollReveal>
                    ))}
                </div>

                {/* View All Button */}
                <ScrollReveal direction="up" delay={0.4} className="text-center mt-12">
                    <Link href="/news" className="inline-flex items-center gap-2 text-gray-900 font-bold hover:text-[#C8956C] transition-colors group">
                        Xem Tất Cả Tin Tức
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </ScrollReveal>

            </div>
        </section>
    );
}
