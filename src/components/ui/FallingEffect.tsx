"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FallingEffectProps {
    keyword: string;
}

const EFFECTS: Record<string, string[]> = {
    // Noodles / General Food
    "mỳ": ["🍜", "🍝", "🥢", "🍲", "😋"],
    "noodle": ["🍜", "🍝", "🥢", "🍲", "😋"],
    "bún": ["🍜", "🍲", "🍥"],
    "phở": ["🍜", "🍲", "🥩", "🌿"],
    "ngon": ["😋", "🤤", "😍", "✨"],

    // Flavor / Ingredients
    "tôm": ["🦐", "🦞", "🍤"],
    "shrimp": ["🦐", "🦞", "🍤"],
    "hải sản": ["🦐", "🦑", "🦀", "🐟"],
    "bò": ["🥩", "🐮", "🥘"],
    "beef": ["🥩", "🐮", "🥘"],
    "trứng": ["🥚", "🍳"],
    "egg": ["🥚", "🍳"],
    "cay": ["🔥", "🌶️", "🥵", "🧨"],
    "hot": ["🔥", "🌶️", "🥵", "🧨"],
    "spicy": ["🔥", "🌶️", "🥵", "🧨"],
    "lửa": ["🔥", "🌋"],
    "chua": ["🍋", "🍅"],

    // Weather / Mood
    "tuyết": ["❄️", "☃️", "🌨️"],
    "snow": ["❄️", "☃️", "🌨️"],
    "lạnh": ["❄️", "🥶", "🧊"],
    "cold": ["❄️", "🥶", "🧊"],
    "mưa": ["🌧️", "☔", "💧"],
    "rain": ["🌧️", "☔", "💧"],
    "yêu": ["❤️", "💖", "🥰", "💕"],
    "love": ["❤️", "💖", "🥰", "💕"],
    "tết": ["🧧", "🏮", "🌸", "💰", "🎆"],
    "xuân": ["🌸", "🌱", "🦋"],
};

export function FallingEffect({ keyword }: FallingEffectProps) {
    const [items, setItems] = useState<{ id: number; emoji: string; x: number; duration: number }[]>([]);

    useEffect(() => {
        if (!keyword) return;

        const lowerKeyword = keyword.toLowerCase();

        // Find matching effect keys
        const matchedKeys = Object.keys(EFFECTS).filter(key => lowerKeyword.includes(key));

        if (matchedKeys.length === 0) return;

        // Collect all unique emojis from matched keys
        const emojis = Array.from(new Set(matchedKeys.flatMap(key => EFFECTS[key])));

        if (emojis.length === 0) return;

        let interval: NodeJS.Timeout;

        // Create falling items
        const spawnItem = () => {
            const id = Date.now();
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            const x = Math.random() * 100; // Random horizontal position (0-100%)
            const duration = 3 + Math.random() * 4; // Falling duration between 3s and 7s

            setItems((prev) => [...prev, { id, emoji, x, duration }]);

            // Remove item after animation
            setTimeout(() => {
                setItems((prev) => prev.filter((item) => item.id !== id));
            }, duration * 1000);
        };

        // Initial burst
        for (let i = 0; i < 5; i++) spawnItem();

        // Continuous spawn if keyword persists (optional, but requested "falling")
        interval = setInterval(spawnItem, 400); // New item every 300ms

        return () => clearInterval(interval);
    }, [keyword]);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            <AnimatePresence>
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ y: -50, x: `${item.x}vw`, opacity: 1, rotate: 0 }}
                        animate={{
                            y: "110vh",
                            rotate: 360,
                            opacity: [1, 1, 0] // Fade out at the end
                        }}
                        transition={{ duration: item.duration, ease: "linear" }}
                        className="absolute text-4xl"
                    >
                        {item.emoji}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
