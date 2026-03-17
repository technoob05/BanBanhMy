"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Flame, Award } from "lucide-react";
import { useCartStore, Product } from "@/lib/store";

interface ProductCardProps {
    product: Product & {
        description: string;
        rating: number;
        reviews: number;
        spicyLevel: number;
    };
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
    };

    const getCategoryLabel = (category: string) => {
        const labels: Record<string, string> = {
            'mi-goi': 'Mì Gói',
            'mi-ly': 'Mì Ly',
            'mi-to': 'Mì Tô',
            'mi-han-quoc': 'Mì Hàn Quốc',
            'mi-tron': 'Mì Trộn'
        };
        return labels[category] || category;
    };

    return (
        <Link href={`/products/${product.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
                        <div className="flex flex-col gap-2">
                            {product.spicyLevel >= 4 && (
                                <motion.span 
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-gray-900 text-white text-[10px] md:text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg"
                                >
                                    <Flame className="w-3 h-3 text-orange-400" />
                                    {product.spicyLevel}/7 SPICY
                                </motion.span>
                            )}
                            {product.rating >= 4.5 && (
                                <motion.span 
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-[#C8956C] text-white text-[10px] md:text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg"
                                >
                                    <Award className="w-3 h-3" />
                                    BEST SELLER
                                </motion.span>
                            )}
                        </div>
                    </div>

                    {/* Quick Action - visible on mobile or hover on desktop */}
                    <div className="absolute bottom-3 left-3 right-3 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300">
                        <motion.button
                            onClick={handleAddToCart}
                            whileTap={{ scale: 0.9 }}
                            className="w-full bg-white/95 backdrop-blur-md text-gray-900 font-black py-3 rounded-2xl flex items-center justify-center gap-2 shadow-xl border border-gray-100 active:bg-gray-900 active:text-white transition-colors"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-widest">Thêm Ngay</span>
                        </motion.button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                        i < Math.floor(product.rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'fill-gray-200 text-gray-200'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                        <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base lg:text-lg mb-2 line-clamp-2 group-hover:text-[#C8956C] transition-colors leading-snug">
                        {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                        {product.description}
                    </p>

                    {/* Price & Info */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-gray-900">
                                {product.price.toLocaleString()}đ
                            </span>
                            <span className="text-xs text-gray-400">Giá chưa VAT</span>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                                Còn hàng
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
