"use client";

import { motion, Variants, Easing } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right" | "none";
    delay?: number;
    duration?: number;
    className?: string;
    viewportMargin?: string; // e.g. "-100px" to trigger earlier/later
}

export default function ScrollReveal({
    children,
    direction = "up",
    delay = 0,
    duration = 0.5,
    className = "",
    viewportMargin = "-50px",
}: ScrollRevealProps) {
    const getVariants = () => {
        const distance = 50;

        const variants: Variants = {
            hidden: {
                opacity: 0,
                y: direction === "up" ? distance : direction === "down" ? -distance : 0,
                x: direction === "left" ? distance : direction === "right" ? -distance : 0,
            },
            visible: {
                opacity: 1,
                y: 0,
                x: 0,
                transition: {
                    duration: duration,
                    delay: delay,
                    ease: "easeOut" as Easing,
                },
            },
        };

        if (direction === "none") {
            return {
                hidden: { opacity: 0, scale: 0.95 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration, delay, ease: "easeOut" as Easing }
                }
            }
        }

        return variants;
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: viewportMargin }}
            variants={getVariants()}
            className={className}
        >
            {children}
        </motion.div>
    );
}
