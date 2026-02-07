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
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                        <div className="flex flex-col gap-2">
                            {product.spicyLevel >= 4 && (
                                <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                                    <Flame className="w-3 h-3 text-orange-400" />
                                    CỰC CAY {product.spicyLevel}/7
                                </span>
                            )}
                            {product.rating >= 4.5 && (
                                <span className="bg-[#C8956C] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                                    <Award className="w-3 h-3" />
                                    BÁN CHẠY
                                </span>
                            )}
                        </div>
                        <span className="bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                            {getCategoryLabel(product.category)}
                        </span>
                    </div>

                    {/* Quick Action Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-white text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-2 shadow-xl transform hover:scale-105"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                Thêm Vào Giỏ
                            </button>
                        </div>
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
