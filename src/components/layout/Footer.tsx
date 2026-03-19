import Link from "next/link";
import Image from "next/image";
import {
    Facebook,
    Instagram,
    Youtube,
    MapPin,
    Phone,
    Mail,
    ChefHat,
    TrendingUp
} from "lucide-react";

const footerLinks = {
    products: [
        { label: "Mì Gà Thanh", href: "/products/p1" },
        { label: "Mì Bò Cay", href: "/products/p2" },
        { label: "Mì Kem Sữa Dừa", href: "/products/p3" },
    ],
    company: [
        { label: "Về Chúng Tôi", href: "/about" },
        { label: "Công Thức Nấu Ăn", href: "/recipes" },
        { label: "Tin Tức", href: "/news" },
        { label: "Tuyển Dụng", href: "/careers" },
    ],
    support: [
        { label: "Hướng Dẫn Mua Hàng", href: "/guide" },
        { label: "Chính Sách Đổi Trả", href: "/return-policy" },
        { label: "Chính Sách Giao Hàng", href: "/shipping" },
        { label: "FAQs", href: "/faqs" },
    ],
};

const offices = [
    {
        name: "CHI NHÁNH HÀ NỘI",
        address: "Tầng 6, Toà nhà IDMC, 21 Duy Tân, Cầu Giấy, Hà Nội",
        phone: "024 3772 4280"
    },
    {
        name: "CHI NHÁNH HỒ CHÍ MINH",
        address: "Lầu 6, Long Tower, 101-103 Nguyễn Cửu Vân, TP.HCM",
        phone: "028 3848 9670"
    }
];

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Newsletter */}
            <div className="bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern opacity-20" />
                <div className="container py-16 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-6">
                            <TrendingUp className="w-4 h-4" />
                            NHẬN ƯU ĐÃI ĐẶC BIỆT
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                            Đăng Ký Nhận Tin
                        </h3>
                        <p className="text-white/90 mb-8 text-lg">
                            Nhận ngay <span className="font-bold">20% giảm giá</span> cho đơn hàng đầu tiên + cập nhật tin tức mới nhất!
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Nhập email của bạn..."
                                className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 font-medium shadow-lg"
                            />
                            <button type="submit" className="px-8 py-4 bg-[#C8956C] hover:bg-[#A67C52] text-white font-bold rounded-full transition-all shadow-lg hover:scale-105">
                                Đăng Ký
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand - Wider */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="inline-flex items-center mb-6">
                            <div className="relative h-24 w-24">
                                <Image 
                                    src="/images/noodliverse/logo-processed.png" 
                                    alt="Noodliverse Logo" 
                                    fill 
                                    className="object-contain opacity-90 hover:opacity-100 transition-opacity scale-125"
                                />
                            </div>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Khám phá hành trình ẩm thực Việt Nam qua 3 hương vị mì đặc trưng từ Bắc – Trung – Nam.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Facebook, href: "#", color: "hover:bg-blue-600" },
                                { icon: Instagram, href: "#", color: "hover:bg-pink-600" },
                                { icon: Youtube, href: "#", color: "hover:bg-red-600" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    className={`w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center ${social.color} transition-all hover:scale-110`}
                                    aria-label={`Social link ${idx + 1}`}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Products */}
                    <div className="lg:col-span-2">
                        <h4 className="font-black text-lg mb-5">Sản Phẩm</h4>
                        <ul className="space-y-3">
                            {footerLinks.products.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href} 
                                        className="text-gray-400 hover:text-[#C8956C] transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#C8956C] transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="lg:col-span-2">
                        <h4 className="font-black text-lg mb-5">Công Ty</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href} 
                                        className="text-gray-400 hover:text-[#C8956C] transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#C8956C] transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="lg:col-span-2">
                        <h4 className="font-black text-lg mb-5">Hỗ Trợ</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href} 
                                        className="text-gray-400 hover:text-[#C8956C] transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#C8956C] transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact - Wider */}
                    <div className="lg:col-span-2">
                        <h4 className="font-black text-lg mb-5">Liên Hệ</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#C8956C] flex-shrink-0 mt-0.5" />
                                <span className="text-gray-400 text-sm">Tầng 6, Toà nhà IDMC, 21 Duy Tân, Hà Nội</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-[#C8956C]" />
                                <a href="tel:1900123456" className="text-gray-400 hover:text-white transition-colors">
                                    1900 1234
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[#C8956C]" />
                                <a href="mailto:support@noodliverse.vn" className="text-gray-400 hover:text-white transition-colors">
                                    support@noodliverse.vn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Certification and Payment Methods */}
            <div className="border-t border-gray-800 bg-gray-900/50">
                <div className="container py-8">
                    <div className="text-center mb-6">
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Các chứng nhận của Noodliverse</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                            {[
                                { src: "/images/certification/halal.webp", alt: "Halal" },
                                { src: "/images/certification/logo-BRCGS.webp", alt: "BRCGS" },
                                { src: "/images/certification/logo-Gluten-Free.webp", alt: "Gluten Free" },
                                { src: "/images/certification/logo-HACCP.webp", alt: "HACCP" },
                                { src: "/images/certification/logo-IFS.webp", alt: "IFS" },
                                { src: "/images/certification/logo-V-Label.webp", alt: "V-Label" },
                                { src: "/images/certification/vegetarian.webp", alt: "Vegetarian" }
                            ].map((cert, idx) => (
                                <Image 
                                    key={idx} 
                                    src={cert.src} 
                                    alt={cert.alt} 
                                    width={60} 
                                    height={60} 
                                    className="h-12 w-auto object-contain hover:scale-110 transition-all opacity-90 hover:opacity-100" 
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Thanh Toán:</span>
                            <div className="flex gap-3">
                                 <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">MOMO</div>
                                 <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">VNPAY</div>
                                 <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p>© 2024 <span className="font-bold text-white">Noodliverse</span>. Tất cả quyền được bảo lưu.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Chính Sách Bảo Mật
                            </Link>
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Điều Khoản
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
