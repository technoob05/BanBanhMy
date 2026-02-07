"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
    Menu, X, Search, ShoppingCart, User, ChefHat, Home, Package, BookOpen, Info, Mail
} from "lucide-react";
import { useCartStore } from "@/lib/store";

const navLinks = [
    { href: "/", label: "Trang Chủ", icon: Home },
    { href: "/products", label: "Sản Phẩm", icon: Package },
    { href: "/recipes", label: "Công Thức", icon: BookOpen },
    { href: "/about", label: "Giới Thiệu", icon: Info },
    { href: "/contact", label: "Liên Hệ", icon: Mail },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const cartItems = useCartStore((state) => state.items);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100"
                    : "bg-white/50 backdrop-blur-md border-b border-white/20"
            }`}
        >
            <div className="container px-4 md:px-6 flex items-center justify-between h-20">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group relative z-50">
                    <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                        scrolled ? "bg-gray-900" : "bg-gray-900"
                    }`}>
                        <ChefHat className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col -space-y-1">
                        <span className="text-2xl font-black tracking-tight text-gray-900">
                            Mì<span className="text-[#C8956C]">Mart</span>
                        </span>
                        <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">
                            Premium Noodles
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                                scrolled
                                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                    : "text-gray-800 hover:text-gray-900 hover:bg-white/80"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button 
                        className={`p-2.5 rounded-xl transition-all ${
                            scrolled 
                                ? "hover:bg-gray-100 text-gray-700" 
                                : "hover:bg-white/80 text-gray-800"
                        }`}
                        aria-label="Search"
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    <Link 
                        href="/cart" 
                        className={`relative p-2.5 rounded-xl transition-all ${
                            scrolled 
                                ? "hover:bg-gray-100 text-gray-700" 
                                : "hover:bg-white/80 text-gray-800"
                        }`}
                        aria-label="Shopping Cart"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {cartItems.length > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg"
                            >
                                {cartItems.length}
                            </motion.span>
                        )}
                    </Link>

                    <button
                        className="lg:hidden p-2.5 text-gray-800 hover:bg-white/80 rounded-xl transition-colors"
                        onClick={() => setIsOpen(true)}
                        aria-label="Menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-[70] shadow-2xl lg:hidden overflow-y-auto"
                        >
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-gray-900 rounded-xl">
                                            <ChefHat className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="text-2xl font-black">
                                            Mì<span className="text-[#C8956C]">Mart</span>
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <nav className="space-y-2">
                                    {navLinks.map((link, idx) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-gray-50 transition-colors group"
                                            >
                                                <link.icon className="w-5 h-5 text-gray-400 group-hover:text-[#C8956C] transition-colors" />
                                                <span className="font-bold text-gray-900 group-hover:text-[#C8956C] transition-colors">
                                                    {link.label}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* Call to Action */}
                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <Link href="/products" onClick={() => setIsOpen(false)}>
                                        <motion.button
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-bold shadow-lg transition-colors"
                                        >
                                            Mua Sắm Ngay
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
