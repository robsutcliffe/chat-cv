import Gradient from "@components/Gradient";
import AnimatedText from "@components/AnimatedText";
import {useContext, useEffect} from "react";
import { motion, useAnimation } from "framer-motion";
import Writing from "@components/Writing";
import {ColourContext} from "@context/colour.conetxt";

export default function ChatBubble({ text, author }) {
    const { secondaryColours, circleColours } = useContext(ColourContext);

    const controls = useAnimation();
    useEffect(() => {
        const borderColor = [...secondaryColours, ...circleColours.map(c => c.hex)].find(color => color !== "#061e2a");
        controls.start({ borderColor });
    }, [secondaryColours, controls]);

    const isRob = author === "rob"
    const isWaiting = text === "--waiting--";

    const extraBubbleStyle = {
        rob: "rounded-bl-none left-2 top-2 rounded-tl-2xl rounded-br-2xl",
        user: "rounded-br-none left-2 top-2 rounded-tr-2xl rounded-bl-2xl"
    }[author]

    const extraBubbleBackgroundStyle = {
        rob: "bg-opacity-80 rounded-tl-xl rounded-br-xl border-0",
        user: "text-white bg-opacity-50 rounded-tr-xl rounded-bl-xl border "
    }[author]

    const extraWrapperStyles = {
        rob: "justify-start pr-8",
        user: "justify-end pl-8"
    }[author]

    const filter = {
        rob: "blur(0.2px)",
        user: "blur(0.2px)"
    }[author]

    const background = {
        rob: "rgba(255,255,255,1)",
        user: "rgba(6, 30, 42,1)"
    }[author]

    return <div className={`flex flex-row w-full ${extraWrapperStyles}`}>
        <motion.div
            initial={isRob ? { opacity:0, left:-20 } : { opacity:0.3, left:50 }}
            animate={{ opacity:1, left:0 }}
            transition={{ duration: 0.3, delay: isWaiting ? 1 : 0 }}
            className="relative max-w-4xl">
            <Gradient theme={ isRob ? "primary" : "secondary" } style={{filter}} className={`w-full h-full absolute ${extraBubbleStyle}`} />
            <motion.div
                animate={controls}
                initial={{ borderColor: "#061e2a" }}
                transition={{ duration: 10 }}
                style={{ background }}  className={`shadow relative z-10 px-6 py-4 text-lg font-ibm ${extraBubbleBackgroundStyle}`}>
                {isWaiting ? <Writing /> : isRob ? <AnimatedText baseText={text} /> : text}
            </motion.div>
        </motion.div>
    </div>

}