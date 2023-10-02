import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimText({ delay=0, baseText }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) =>
        baseText.slice(0, latest)
    );

    useEffect(() => {
        const controls = animate(count, baseText.length, {
            type: "tween",
            delay: delay,
            duration: baseText.length * 0.04,
            ease: "easeInOut",
        });
        return controls.stop;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <motion.span>{displayText}</motion.span>
}