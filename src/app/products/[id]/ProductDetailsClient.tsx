"use client";

import { useState } from "react";
import { ShoppingCart, Heart, ShieldCheck, Truck } from "lucide-react";
import { useCartStore } from "@/lib/store";

export function ProductDetailsClient({ product }: { product: any }) {
    const addItem = useCartStore((state) => state.addItem);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }
    };

    return (
        <div className="space-y-8">
            <div className="border-t border-border py-6 space-y-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-full bg-white shadow-sm">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-12 h-12 flex items-center justify-center hover:bg-muted rounded-l-full transition-colors"
                        >
                            -
                        </button>
                        <span className="w-12 text-center font-bold">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-12 h-12 flex items-center justify-center hover:bg-muted rounded-r-full transition-colors"
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 btn-primary py-3 rounded-full flex items-center justify-center gap-2 text-lg hover:shadow-xl transition-all"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Thêm Vào Giỏ
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center border border-border rounded-full hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                        <Heart className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-8">
                <div className="flex items-center gap-3 p-4 bg-orange-50/50 border border-orange-100 rounded-2xl">
                    <Truck className="w-6 h-6 text-orange-600" />
                    <div>
                        <p className="font-bold">Giao hàng Nhanh</p>
                        <p className="text-stone-500">Nhận hàng trong 30-60 phút</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-50/50 border border-green-100 rounded-2xl">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                    <div>
                        <p className="font-bold">Đảm bảo Chất lượng</p>
                        <p className="text-stone-500">Chính hãng Noodliverse 100%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
