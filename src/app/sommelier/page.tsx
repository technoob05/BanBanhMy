'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Send, Loader2, Sparkles, AlertCircle, BookOpen, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { marked } from 'marked'; // Ensure marked is installed/imported

// --- Types ---
interface Citation {
    source: string;
    url: string;
    title: string;
}

interface SommelierMessage {
    id: number;
    type: 'user' | 'bot' | 'error';
    text: string;
    citations?: Citation[];
}

export default function SommelierPage() {
    const [messages, setMessages] = useState<SommelierMessage[]>([
        {
            id: 1,
            type: 'bot',
            text: 'Xin chào! Tôi là Noodle Sommelier. Bạn muốn hỏi gì về thế giới mỳ? (Ví dụ: "Loại mỳ gói nào cay nhất?", "Lịch sử phở Việt Nam?", "Mỳ ý nào ít calo?")'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatMessage = (text: string) => {
        // Simple wrapper for marked to ensure html string
        return { __html: marked.parse(text) };
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: SommelierMessage = { id: Date.now(), type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/sommelier', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: userMsg.text }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Lỗi kết nối');

            const botMsg: SommelierMessage = {
                id: Date.now() + 1,
                type: 'bot',
                text: data.answer,
                citations: data.citations,
            };
            setMessages(prev => [...prev, botMsg]);

        } catch (error: any) {
            setMessages(prev => [...prev, { id: Date.now(), type: 'error', text: `Lỗi: ${error.message}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 p-4 md:p-8 flex flex-col items-center">

            <div className="max-w-3xl w-full flex-1 flex flex-col gap-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-block p-3 bg-amber-100 rounded-full mb-2">
                        <Sparkles className="w-6 h-6 text-amber-600" />
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-stone-800">Noodle Sommelier</h1>
                    <p className="text-stone-600 italic">Chuyên gia ẩm thực AI - Hỏi gì cũng biết về Mỳ</p>
                </div>

                {/* Chat Area */}
                <Card className="flex-1 bg-white shadow-xl border-amber-100 flex flex-col overflow-hidden min-h-[60vh]">
                    <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
                        <AnimatePresence>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex flex-col gap-2 max-w-[90%]",
                                        msg.type === 'user' ? "self-end items-end" : "self-start items-start"
                                    )}
                                >
                                    <div className={cn(
                                        "p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed",
                                        msg.type === 'user'
                                            ? "bg-stone-800 text-white rounded-br-none"
                                            : msg.type === 'error'
                                                ? "bg-red-50 text-red-800 border border-red-100"
                                                : "bg-amber-50 text-stone-800 border border-amber-100 rounded-bl-none"
                                    )}>
                                        {msg.type === 'bot' ? (
                                            <div dangerouslySetInnerHTML={formatMessage(msg.text) as any} className="prose prose-sm max-w-none pt-1" />
                                        ) : (
                                            msg.text
                                        )}
                                    </div>

                                    {/* Citations Display */}
                                    {msg.citations && msg.citations.length > 0 && (
                                        <div className="ml-2 flex flex-wrap gap-2">
                                            {msg.citations.map((cite, idx) => (
                                                <a
                                                    key={idx}
                                                    href={cite.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full border border-stone-200 transition-colors"
                                                >
                                                    <BookOpen className="w-3 h-3" />
                                                    <span className="truncate max-w-[150px]">{cite.source}</span>
                                                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-50" />
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isLoading && (
                            <div className="flex items-center gap-2 text-stone-400 text-sm ml-4">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Chuyên gia đang tra cứu tài liệu...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </CardContent>

                    {/* Input Area */}
                    <div className="p-4 bg-stone-50 border-t border-stone-200">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="flex gap-2"
                        >
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Hỏi về mỳ, phở, bún..."
                                className="flex-1 bg-white border-stone-300 focus-visible:ring-amber-500"
                                disabled={isLoading}
                            />
                            <Button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="bg-amber-600 hover:bg-amber-700 text-white"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            </Button>
                        </form>
                    </div>
                </Card>

            </div>
        </div>
    );
}
