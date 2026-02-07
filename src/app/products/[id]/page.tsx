"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Star, ShoppingCart, Heart, ShieldCheck, Truck } from "lucide-react";
import { products } from "@/lib/data";
import { useCartStore } from "@/lib/store";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const product = products.find((p) => p.id === params.id);
    const addItem = useCartStore((state) => state.addItem);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        notFound();
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }
    };

    return (
        <div className="min-h-screen py-20 bg-background">
            <div className="container mt-8">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square rounded-3xl overflow-hidden border border-border bg-muted">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square rounded-xl bg-muted cursor-pointer hover:border-primary border-2 border-transparent transition-all overflow-hidden relative">
                                    <Image src={product.image} alt="Thumbnail" fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                                    {product.category === 'mi-goi' ? 'Mì Gói' :
                                        product.category === 'mi-ly' ? 'Mì Ly' :
                                            product.category === 'mi-han-quoc' ? 'Mì Hàn Quốc' : product.category}
                                </span>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="font-bold">{product.rating}</span>
                                    <span className="text-muted-foreground">({product.reviews} đánh giá)</span>
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-outfit)]">
                                {product.name}
                            </h1>

                            <p className="text-3xl font-bold text-primary mb-6">
                                {product.price.toLocaleString()}đ
                            </p>

                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {product.description} Thưởng thức ngay hương vị tuyệt hảo, đậm đà khó quên.
                                Sản phẩm được đóng gói kỹ lưỡng, đảm bảo vệ sinh an toàn thực phẩm.
                            </p>
                        </div>

                        <div className="border-t border-border py-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-border rounded-full">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-muted rounded-l-full"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center font-bold">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-muted rounded-r-full"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 btn-gradient py-3 rounded-full flex items-center justify-center gap-2 text-lg hover:shadow-xl"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Thêm Vào Giỏ
                                </button>
                                <button className="w-12 h-12 flex items-center justify-center border border-border rounded-full hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                                    <Heart className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                                <Truck className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="font-bold">Giao hàng thần tốc</p>
                                    <p className="text-muted-foreground">Nhận hàng trong 30p</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                                <ShieldCheck className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="font-bold">Đảm bảo chất lượng</p>
                                    <p className="text-muted-foreground">Chính hãng 100%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
