"use client";

import { motion } from "framer-motion";
import { Clock, Users, ChevronRight } from "lucide-react";
import Image from "next/image";

const recipes = [
    {
        id: 1,
        title: "Mì Trộn Kim Chi Phô Mai",
        image: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1000&auto=format&fit=crop",
        time: "15 phút",
        serving: "2 người",
        difficulty: "Dễ",
        ingredients: ["2 gói mì Hàn Quốc", "100g Kimchi", "2 lát phô mai", "1 cây xúc xích"],
    },
    {
        id: 2,
        title: "Pizza Mì Tôm",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1000&auto=format&fit=crop",
        time: "20 phút",
        serving: "3 người",
        difficulty: "Trung bình",
        ingredients: ["2 gói mì Hảo Hảo", "3 quả trứng", "Phô mai Mozzarella", "Ớt chuông"],
    },
    {
        id: 3,
        title: "Mì Xào Hải Sản Giòn Rụm",
        image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?q=80&w=1000&auto=format&fit=crop",
        time: "25 phút",
        serving: "2 người",
        difficulty: "Khó",
        ingredients: ["Mì xào giòn", "Tôm", "Mực", "Rau cải thìa", "Cà rốt"],
    },
];

export default function RecipesPage() {
    return (
        <div className="min-h-screen bg-muted/20 py-20">
            <div className="container">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-outfit)]">
                        Góc Bếp MìMart
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Biến tấu mì gói thành những món ăn đẳng cấp nhà hàng với công thức độc quyền.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipes.map((recipe, idx) => (
                        <motion.div
                            key={recipe.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-card rounded-3xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-300 group"
                        >
                            <div className="relative aspect-video overflow-hidden group">
                                <Image
                                    src={recipe.image}
                                    alt={recipe.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                    {recipe.difficulty}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-outfit)] group-hover:text-primary transition-colors">
                                    {recipe.title}
                                </h3>

                                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {recipe.time}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        {recipe.serving}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {recipe.ingredients.map((ing, i) => (
                                            <span key={i} className="text-xs bg-muted px-2 py-1 rounded-md">
                                                {ing}
                                            </span>
                                        ))}
                                    </div>

                                    <button className="w-full py-3 rounded-xl border border-border hover:bg-primary hover:text-white hover:border-primary transition-all font-bold flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white">
                                        Xem Chi Tiết <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
