"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Globe, Factory, Users, Star, Award, Utensils, Flame, TrendingUp, Shield, Truck, HeadphonesIcon, Check, Quote, Play } from "lucide-react";
import { products } from "@/lib/data";
import ScrollReveal from "@/app/components/ScrollReveal";
import NewsSection from "@/app/components/NewsSection";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  const stats = [
    { id: 1, number: "2+", label: "Nhà máy", icon: Factory },
    { id: 2, number: "50+", label: "Loại Mì", icon: Utensils },
    { id: 3, number: "15+", label: "Quốc gia", icon: Globe },
    { id: 4, number: "2000+", label: "Nhân viên", icon: Users },
  ];

  return (
    <div className="overflow-hidden bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#FAFAF8] via-[#F5F0EB] to-[#EDE5DB] overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-pattern opacity-20 pointer-events-none" />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => {
            const randomX = ((i * 17) % 100) - 50; // Deterministic X
            const randomY = ((i * 23) % 100) * -1; // Deterministic Y
            const top = 10 + ((i * 13) % 80);
            const left = 10 + ((i * 19) % 80);
            const duration = 8 + i * 0.5;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.3, 1],
                  x: [0, randomX, 0],
                  y: [0, randomY, 0]
                }}
                transition={{ duration: duration, repeat: Infinity, delay: i * 0.5 }}
                className="absolute w-40 h-40 bg-[#C8956C]/8 rounded-full blur-3xl"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                }}
              />
            )
          })}
        </div>

        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-xl"
            >
              <Flame className="w-5 h-5 text-[#C8956C]" />
              <span className="font-bold text-[#A67C52] text-sm">MÌ SỐ 1 VIỆT NAM</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 leading-[1.1]">
              HƯƠNG VỊ<br />
              <span className="text-[#C8956C]">ĐẲNG CẤP</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 font-semibold max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Khám phá thế giới mì gói cao cấp với hơn 50+ hương vị đặc sắc từ khắp nơi trên thế giới
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-900 hover:bg-gray-800 text-white text-lg sm:text-xl px-10 py-5 rounded-full font-bold shadow-2xl transition-all flex items-center gap-3"
                >
                  <ShoppingBag className="w-6 h-6" />
                  Khám Phá Ngay
                </motion.button>
              </Link>
            </div>

            {/* Mini Stats */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-6">
              {[
                { label: "Sản phẩm", value: "50+" },
                { label: "Đánh giá 5★", value: "10K+" },
                { label: "Khách hàng", value: "100K+" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[700px] w-full"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop"
                alt="Premium Noodles"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [8, 12, 8]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 right-5 lg:right-10 bg-white px-6 py-4 rounded-2xl shadow-2xl border-4 border-gray-900 transform rotate-12"
            >
              <div className="text-center">
                <span className="text-4xl font-black text-gray-900 block">TOP</span>
                <span className="text-lg font-bold text-gray-700">BÁN CHẠY</span>
              </div>
            </motion.div>

            {/* New Badge */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-10 left-5 lg:left-10 bg-gray-900 text-white px-5 py-3 rounded-full shadow-xl font-bold text-sm flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              MỚI RA MẮT
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 text-center hidden lg:block"
        >
          <div className="text-sm font-semibold mb-2">Cuộn xuống</div>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full mx-auto flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-16 lg:py-24 bg-white relative">
        <div className="absolute inset-0 bg-halftone opacity-30" />

        <div className="container relative z-10">
          <ScrollReveal
            direction="up"
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#C8956C]/10 text-[#A67C52] rounded-full font-bold text-sm mb-4">
              CON SỐ NỔI BẬT
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
              Thương Hiệu <span className="text-[#C8956C]">Uy Tín</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, idx) => (
              <ScrollReveal
                key={stat.id}
                direction="up"
                delay={idx * 0.1}
                className="text-center bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-[#C8956C]/10 rounded-2xl flex items-center justify-center text-[#C8956C] group-hover:bg-gray-900 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    <stat.icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-bold text-sm lg:text-base uppercase tracking-wide">
                  {stat.label}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURE SECTION - ZIG-ZAG LAYOUT */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container space-y-20 lg:space-y-32">

          {/* Feature 1: Quality Noodles */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <ScrollReveal
              direction="left"
              className="order-2 lg:order-1 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold text-sm">
                <Award className="w-4 h-4" />
                CHẤT LƯỢNG HÀNG ĐẦU
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                Sợi Mì Dai Ngon<br />
                <span className="text-[#C8956C]">Chuẩn Nhật Bản</span>
              </h3>

              <p className="text-lg text-gray-600 leading-relaxed">
                Công nghệ chiên chân không hiện đại giúp giữ nguyên độ dai, màu vàng óng tự nhiên của sợi mì. Giảm 30% lượng dầu so với phương pháp truyền thống.
              </p>

              <ul className="space-y-4">
                {[
                  "Không chất bảo quản độc hại",
                  "Giàu Vitamin B & E",
                  "Chiên ở nhiệt độ tối ưu"
                ].map((item, i) => (
                  <ScrollReveal
                    key={i}
                    direction="left"
                    delay={i * 0.1}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-green-100 text-green-600 flex items-center justify-center font-bold flex-shrink-0">
                      ✓
                    </div>
                    <span className="font-semibold text-gray-700">{item}</span>
                  </ScrollReveal>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal
              direction="none"
              className="order-1 lg:order-2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1200"
                alt="Quality Noodles"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </ScrollReveal>
          </div>

          {/* Feature 2: Rich Sauce */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <ScrollReveal
              direction="none"
              className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1200"
                alt="Rich Sauce"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </ScrollReveal>

            <ScrollReveal
              direction="right"
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-bold text-sm">
                <Star className="w-4 h-4" />
                HƯƠNG VỊ ĐỘC QUYỀN
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                Nước Súp Đậm Đà<br />
                <span className="text-[#C8956C]">Cô Đặc Tinh Tuý</span>
              </h3>

              <p className="text-lg text-gray-600 leading-relaxed">
                Hầm từ xương ống thượng hạng và rau củ quả tươi trong 12 giờ. Gói gia vị cô đặc độc quyền mang đến hương vị bùng nổ ngay từ ngụm đầu tiên.
              </p>

              <Link href="/recipes">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-gray-900 font-bold text-lg group"
                >
                  Khám phá bí quyết
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </Link>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="section-padding bg-white">
        <div className="container">
          <ScrollReveal
            direction="up"
            className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12"
          >
            <div>
              <span className="inline-block px-4 py-2 bg-[#C8956C]/10 text-[#A67C52] rounded-full font-bold text-sm mb-3">
                SẢN PHẨM NỔI BẬT
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-gray-900">
                Được Yêu Thích Nhất
              </h3>
              <p className="text-gray-500 mt-2">Những hương vị bán chạy nhất tháng này</p>
            </div>
            <Link
              href="/products"
              className="group flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-[#C8956C] transition-all"
            >
              Xem Tất Cả
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product, idx) => (
              <ScrollReveal
                key={product.id}
                direction="up"
                delay={idx * 0.1}
                className="group"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden mb-4 shadow-sm hover:shadow-2xl transition-all duration-300">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-bold rounded-full shadow-lg">
                        {product.category === 'mi-ly' ? 'Mì Ly' :
                          product.category === 'mi-han-quoc' ? 'Mì Hàn' : 'Mì Gói'}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                    {/* Add to Cart Button */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 hover:text-white transition-all shadow-xl">
                        <ShoppingBag className="w-4 h-4" />
                        Thêm Giỏ Hàng
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-base text-gray-900 group-hover:text-[#C8956C] transition-colors line-clamp-2 min-h-[3rem]">
                      {product.name}
                    </h4>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-gray-900">
                        {product.price.toLocaleString()}đ
                      </span>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-lg">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-yellow-700">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US - BENEFITS */}
      <section className="section-padding bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10" />

        <div className="container relative z-10">
          <ScrollReveal
            direction="up"
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-sm mb-4">
              TẠI SAO CHỌN CHÚNG TÔI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Cam Kết <span className="text-[#C8956C]">Chất Lượng</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Chúng tôi mang đến trải nghiệm mua sắm tuyệt vời nhất
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Hàng Chính Hãng 100%",
                description: "Cam kết nguồn gốc xuất xứ rõ ràng, không bán hàng giả, hàng nhái",
                color: "from-gray-600 to-gray-700"
              },
              {
                icon: Truck,
                title: "Giao Hàng Nhanh Chóng",
                description: "Giao hàng toàn quốc trong 24-48h, miễn phí với đơn từ 200k",
                color: "from-gray-600 to-gray-700"
              },
              {
                icon: HeadphonesIcon,
                title: "Hỗ Trợ 24/7",
                description: "Đội ngũ tư vấn nhiệt tình, sẵn sàng hỗ trợ bạn mọi lúc mọi nơi",
                color: "from-gray-600 to-gray-700"
              },
              {
                icon: Award,
                title: "Giá Tốt Nhất",
                description: "Cam kết giá cạnh tranh nhất thị trường, hoàn tiền nếu tìm được rẻ hơn",
                color: "from-gray-600 to-gray-700"
              }
            ].map((benefit, idx) => (
              <ScrollReveal
                key={idx}
                direction="up"
                delay={idx * 0.1}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-3">{benefit.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <ScrollReveal
            direction="up"
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#C8956C]/10 text-[#A67C52] rounded-full font-bold text-sm mb-4">
              ĐÁNH GIÁ KHÁCH HÀNG
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Khách Hàng <span className="text-[#C8956C]">Nói Gì</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hơn 100,000+ khách hàng hài lòng trên toàn quốc
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Nguyễn Minh Anh",
                role: "Khách hàng thân thiết",
                avatar: "https://i.pravatar.cc/150?img=1",
                rating: 5,
                comment: "Mì ở đây ngon tuyệt vời! Đặc biệt là mì Hàn Quốc, vị đậm đà đúng chuẩn. Giao hàng nhanh, đóng gói cẩn thận. Sẽ ủng hộ tiếp!"
              },
              {
                name: "Trần Văn Nam",
                role: "Dân văn phòng",
                avatar: "https://i.pravatar.cc/150?img=12",
                rating: 5,
                comment: "Mình thích nhất là dịch vụ giao hàng siêu nhanh. Đặt sáng chiều đã có. Mì đa dạng lắm, từ bình dân đến cao cấp đều có."
              },
              {
                name: "Lê Thị Hương",
                role: "Sinh viên",
                avatar: "https://i.pravatar.cc/150?img=5",
                rating: 5,
                comment: "Giá cả hợp lý, có nhiều combo tiết kiệm cho sinh viên. Tư vấn nhiệt tình, giao hàng đúng hẹn. Rất hài lòng!"
              }
            ].map((review, idx) => (
              <ScrollReveal
                key={idx}
                direction="up"
                delay={idx * 0.15}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <Quote className="w-10 h-10 text-[#C8956C]/20 mb-4" />

                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  &quot;{review.comment}&quot;
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VIDEO/PROCESS SECTION */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal
              direction="left"
              className="space-y-6"
            >
              <span className="inline-block px-4 py-2 bg-[#C8956C]/10 text-[#A67C52] rounded-full font-bold text-sm">
                QUY TRÌNH SẢN XUẤT
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                Từ Nguyên Liệu<br />
                Đến <span className="text-[#C8956C]">Thành Phẩm</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Mỗi sợi mì đều được sản xuất theo quy trình khép kín, kiểm soát chất lượng nghiêm ngặt,
                đảm bảo vệ sinh an toàn thực phẩm tuyệt đối.
              </p>

              <ul className="space-y-4">
                {[
                  "Chọn lọc nguyên liệu đạt chuẩn quốc tế",
                  "Sản xuất trong môi trường vô trùng",
                  "Kiểm định chất lượng đa tầng",
                  "Đóng gói bảo quản hiện đại"
                ].map((item, i) => (
                  <ScrollReveal
                    key={i}
                    direction="left"
                    delay={i * 0.1}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold flex-shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-gray-700">{item}</span>
                  </ScrollReveal>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal
              direction="none"
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200"
                alt="Manufacturing Process"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl"
                >
                  <Play className="w-8 h-8 text-gray-900 ml-1" />
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 8. NEWS SECTION */}
      <NewsSection />

      {/* 9. CTA SECTION */}
      <section className="section-padding bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20" />

        <div className="container relative z-10">
          <ScrollReveal
            direction="up"
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Bạn Đã Sẵn Sàng<br />
              Trải Nghiệm Chưa?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Hàng ngàn món mì đang chờ bạn khám phá. Đặt hàng ngay hôm nay và nhận ưu đãi đặc biệt!
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-900 px-10 py-5 rounded-full font-black text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3"
                >
                  <ShoppingBag className="w-6 h-6" />
                  Mua Sắm Ngay
                </motion.button>
              </Link>

              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-full font-black text-lg hover:bg-white/20 transition-all"
                >
                  Tìm Hiểu Thêm
                </motion.button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
