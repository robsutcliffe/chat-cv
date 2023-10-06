import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AnimText({ delay=0, baseText }) {
    const ref = useRef()
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) =>
        baseText.slice(0, latest)
    );

    useEffect(() => {
        const controls = animate(count, baseText.length, {
            type: "tween",
            delay: delay,
            duration: baseText.length * 0.02,
            ease: "linear",
            onUpdate: () => {
                ref.current?.scrollIntoView({ behavior: "smooth" })
            }
        });
        return controls.stop;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <motion.span ref={ref}>{displayText}</motion.span>
}