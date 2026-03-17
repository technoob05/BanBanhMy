"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
    Menu, X, Search, ShoppingCart, User, ChefHat, Home, Package, BookOpen, Info, Mail
} from "lucide-react";
import { useStore } from "@/lib/store";
import { AuthModal } from "./AuthModal";
import { User as UserIcon, LogOut, Package as PackageIcon } from "lucide-react";

const navLinks = [
    { href: "/", label: "Trang Chủ", icon: Home },
    { href: "/products", label: "Sản Phẩm", icon: Package },
    { href: "/fridge-scanner", label: "Vision Chef", icon: ChefHat },
    { href: "/recipes", label: "Công Thức", icon: BookOpen },
    { href: "/about", label: "Giới Thiệu", icon: Info },
    { href: "/contact", label: "Liên Hệ", icon: Mail },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, logout, items: cartItems } = useStore();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen || isAuthOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, isAuthOpen]);

    return (
        <>
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100"
                : "bg-white/20 backdrop-blur-xl border-b border-white/20"
                }`}
        >
            <div className="container px-4 md:px-6 flex items-center justify-between h-20">
                {/* Logo */}
                <Link href="/" className="flex items-center group relative z-50">
                    <div className="relative h-16 md:h-20 w-16 md:w-20 transition-all duration-300">
                        <Image 
                            src="/images/noodliverse/logo-processed.png" 
                            alt="Noodliverse Logo" 
                            fill
                            className="object-contain scale-125" 
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${scrolled
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
                        className={`p-2.5 rounded-xl transition-all ${scrolled
                            ? "hover:bg-gray-100 text-gray-700"
                            : "hover:bg-white/80 text-gray-800"
                            }`}
                        aria-label="Search"
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    {user ? (
                        <div className="relative">
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className={`p-2.5 rounded-xl transition-all flex items-center gap-2 ${scrolled
                                    ? "hover:bg-gray-100 text-[#C8956C]"
                                    : "hover:bg-white/80 text-[#C8956C]"
                                    }`}
                            >
                                <UserIcon className="w-5 h-5" />
                                <span className="hidden md:block font-bold text-sm text-gray-900">{user.name}</span>
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-[60]"
                                    >
                                        <Link href="/account" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 font-bold text-sm">
                                            <UserIcon className="w-4 h-4" /> Tài khoản
                                        </Link>
                                        <Link href="/order-tracking" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 font-bold text-sm">
                                            <PackageIcon className="w-4 h-4" /> Đơn hàng
                                        </Link>
                                        <button 
                                            onClick={() => { logout(); setIsProfileOpen(false); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 font-bold text-sm border-t border-gray-50"
                                        >
                                            <LogOut className="w-4 h-4" /> Đăng xuất
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsAuthOpen(true)}
                            className={`p-2.5 rounded-xl transition-all ${scrolled
                                ? "hover:bg-gray-100 text-gray-700"
                                : "hover:bg-white/80 text-gray-800"
                                }`}
                            aria-label="User Login"
                        >
                            <UserIcon className="w-5 h-5" />
                        </button>
                    )}

                    <Link
                        href="/cart"
                        className={`relative p-2.5 rounded-xl transition-all ${scrolled
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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] lg:hidden bg-white flex flex-col h-[100dvh]"
                    >
                        {/* Mobile Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center">
                                <div className="relative h-12 w-12">
                                    <Image src="/images/noodliverse/logo-processed.png" alt="Noodliverse Logo" fill className="object-contain" />
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-8 h-8 text-gray-900" />
                            </button>
                        </div>

                        {/* Mobile Links */}
                        <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-start space-y-4 pt-8">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group"
                                    >
                                        <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-[#C8956C]/10 transition-colors">
                                            <link.icon className="w-6 h-6 text-gray-500 group-hover:text-[#C8956C] transition-colors" />
                                        </div>
                                        <span className="text-xl font-bold text-gray-900 group-hover:text-[#C8956C] transition-colors">
                                            {link.label}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile Footer/CTA */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                            <Link href="/products" onClick={() => setIsOpen(false)}>
                                <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform">
                                    <ShoppingCart className="w-5 h-5" />
                                    Mua Sắm Ngay
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>

        <AuthModal 
            isOpen={isAuthOpen} 
            onClose={() => setIsAuthOpen(false)} 
        />
        </>
    );
}
