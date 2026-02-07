"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

interface Message {
    role: "user" | "model";
    parts: string;
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "model",
            parts: "Xin chào! 👋 Mình là Mì-Bot. Bạn đang thèm loại mì nào hôm nay? 🍜",
        },
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const mutation = useMutation({
        mutationFn: async (message: string) => {
            const history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.parts }]
            }));

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, history }),
            });

            if (!res.ok) throw new Error("Failed to send message");
            return res.json();
        },
        onSuccess: (data) => {
            setMessages((prev) => [
                ...prev,
                { role: "model", parts: data.response },
            ]);
        },
        onError: () => {
            setMessages((prev) => [
                ...prev,
                { role: "model", parts: "Xin lỗi, Mì-Bot đang bị 'rối' một chút. Bạn hỏi lại sau nhé! 😵‍💫" },
            ]);
        },
    });

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages((prev) => [...prev, { role: "user", parts: userMsg }]);
        setInput("");
        mutation.mutate(userMsg);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && !isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="w-[350px] h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Mì-Bot Tư Vấn</h3>
                                    <span className="text-xs text-white/80 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        Online
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => setIsMinimized(true)}
                                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <Minimize2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                        }`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user"
                                                ? "bg-secondary text-white"
                                                : "bg-primary text-white"
                                            }`}
                                    >
                                        {msg.role === "user" ? (
                                            <User className="w-5 h-5" />
                                        ) : (
                                            <Bot className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                                                ? "bg-secondary text-white rounded-tr-none"
                                                : "bg-card border border-border shadow-sm rounded-tl-none"
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap">{msg.parts}</p>
                                    </div>
                                </div>
                            ))}
                            {mutation.isPending && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-none shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-100" />
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-200" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-card border-t border-border">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Hỏi Mì-Bot về các loại mì..."
                                    className="flex-1 px-4 py-2 rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || mutation.isPending}
                                    className="p-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                    setIsOpen(true);
                    setIsMinimized(false);
                }}
                className={`w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg flex items-center justify-center transition-all ${isOpen && !isMinimized ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    }`}
            >
                <MessageCircle className="w-7 h-7" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] items-center justify-center font-bold">1</span>
                </span>
            </motion.button>
        </div>
    );
}
