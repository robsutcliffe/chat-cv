import Gradient from "@components/Gradient";
import AnimatedText from "@components/AnimatedText";
import {useContext, useEffect} from "react";
import { motion, useAnimation } from "framer-motion";
import {ColourContext} from "@context/colour.conetxt";

export default function ChatBubble({ text, author }) {
    const { secondaryColours, circleColours } = useContext(ColourContext);

    const controls = useAnimation();
    useEffect(() => {
        const borderColor = [...secondaryColours, ...circleColours.map(c => c.hex)].find(color => color !== "#061e2a");
        controls.start({ borderColor });
    }, [secondaryColours, controls]);

    const primary = author === "rob"
    const extraBubbleStyle = {
        rob: "rounded-bl-none left-2 top-2 rounded-tl-2xl rounded-br-2xl",
        user: "rounded-br-none left-2 top-2 rounded-tr-2xl rounded-bl-2xl"
    }[author]

    const extraBubbleBackgroundStyle = {
        rob: "bg-opacity-80 rounded-tl-xl rounded-br-xl border-0",
        user: "text-white bg-opacity-50 rounded-tr-xl rounded-bl-xl border "
    }[author]

    const extraWrapperStyles = {
        rob: "justify-start",
        user: "justify-end"
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
        <div className="relative max-w-4xl">
            <Gradient theme={ author === "rob" ? "primary" : "secondary" } style={{filter}} className={`w-full h-full absolute ${extraBubbleStyle}`} />
            <motion.div
                animate={controls}
                initial={{ borderColor: "#061e2a" }}
                transition={{ duration: 10 }}
                style={{ background }}  className={`shadow relative z-10 px-6 py-4 text-lg font-ibm ${extraBubbleBackgroundStyle}`}>
                {author === "rob" ? <AnimatedText baseText={text} /> : text}
            </motion.div>
        </div>
    </div>

}