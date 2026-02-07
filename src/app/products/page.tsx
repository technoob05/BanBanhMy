"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/features/ProductCard";
import { products, categories } from "@/lib/data";

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
    const [showFilters, setShowFilters] = useState(false);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

            return matchesCategory && matchesSearch && matchesPrice;
        });
    }, [selectedCategory, searchQuery, priceRange]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container pt-32 pb-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 bg-[#C8956C]/10 text-[#A67C52] rounded-full font-bold text-sm mb-4">
                        SẢN PHẨM
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                        Thực Đơn <span className="text-[#C8956C]">Mì Ngon</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Khám phá hơn 50+ hương vị mì đa dạng từ khắp nơi trên thế giới
                    </p>
                </motion.div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Tìm kiếm mì ngon..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-gray-200 focus:border-[#C8956C] focus:ring-4 focus:ring-[#C8956C]/10 transition-all shadow-sm font-medium"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-400" />
                            </button>
                        )}
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        Bộ Lọc
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className={`w-full lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        {/* Categories */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border-2 border-gray-100"
                        >
                            <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                                <Filter className="w-5 h-5 text-[#C8956C]" />
                                Danh Mục
                            </h3>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-all font-semibold ${selectedCategory === cat.id
                                                ? "bg-gray-900 text-white shadow-lg scale-105"
                                                : "hover:bg-gray-50 text-gray-700"
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Price Filter */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border-2 border-gray-100"
                        >
                            <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                                <SlidersHorizontal className="w-5 h-5 text-[#C8956C]" />
                                Khoảng Giá
                            </h3>
                            <div className="space-y-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="50000"
                                    step="1000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#C8956C]"
                                    style={{
                                        background: `linear-gradient(to right, #C8956C 0%, #C8956C ${(priceRange[1] / 50000) * 100}%, #E5E7EB ${(priceRange[1] / 50000) * 100}%, #E5E7EB 100%)`
                                    }}
                                />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-700">0đ</span>
                                    <span className="px-4 py-2 bg-[#C8956C]/10 text-[#A67C52] rounded-lg font-black">
                                        {priceRange[1].toLocaleString()}đ
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Active Filters Summary */}
                        {(selectedCategory !== "all" || searchQuery || priceRange[1] < 50000) && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-blue-50 border-2 border-blue-200 p-4 rounded-2xl"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-sm text-blue-900">Bộ lọc đang áp dụng</span>
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedCategory("all");
                                            setPriceRange([0, 50000]);
                                        }}
                                        className="text-xs font-bold text-blue-600 hover:text-blue-800 underline"
                                    >
                                        Xóa tất cả
                                    </button>
                                </div>
                                <div className="space-y-2 text-sm text-blue-700">
                                    {selectedCategory !== "all" && <div>• Danh mục: <span className="font-semibold">{categories.find(c => c.id === selectedCategory)?.name}</span></div>}
                                    {searchQuery && <div>• Tìm kiếm: <span className="font-semibold">&quot;{searchQuery}&quot;</span></div>}
                                    {priceRange[1] < 50000 && <div>• Giá tối đa: <span className="font-semibold">{priceRange[1].toLocaleString()}đ</span></div>}
                                </div>
                            </motion.div>
                        )}
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600 font-semibold">
                                Tìm thấy <span className="text-gray-900 font-black">{filteredProducts.length}</span> sản phẩm
                            </p>
                        </div>

                        <AnimatePresence mode="wait">
                            {filteredProducts.length > 0 ? (
                                <motion.div
                                    key="products"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
                                >
                                    {filteredProducts.map((product, idx) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <ProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="no-results"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200"
                                >
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Search className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-3">
                                        Không Tìm Thấy Sản Phẩm
                                    </h3>
                                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                        Thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc của bạn
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedCategory("all");
                                            setPriceRange([0, 50000]);
                                        }}
                                        className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:scale-105"
                                    >
                                        Xóa Bộ Lọc
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
