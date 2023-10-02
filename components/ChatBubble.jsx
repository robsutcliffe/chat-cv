import Gradient from "@components/Gradient";
import AnimatedText from "@components/AnimatedText";
export default function ChatBubble({ text, author }) {

    const primary = author === "rob"

    const extraBubbleStyle = {
        rob: "rounded-bl-none left-2 top-2",
        user: "rounded-br-none left-2 top-2"
    }[author]

    const extraBubbleBackgroundStyle = {
        rob: "rounded-bl-none bg-opacity-80",
        user: "text-white rounded-br-none bg-opacity-80"
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
        rob: "#ffffff",
        user: "#061e2a"
    }[author]

    return <div className={`flex flex-row w-full ${extraWrapperStyles}`}>
        <div className="relative max-w-4xl">
            <Gradient primary={primary} style={{filter }} className={`w-full rounded h-full absolute ${extraBubbleStyle}`} />
            <div style={{ background }} className={`relative rounded z-10 px-6 py-4 max-w-xl text-xl font-ibm ${extraBubbleBackgroundStyle}`}>
                {author === "rob" ? <AnimatedText baseText={text} /> : text}
            </div>
        </div>
    </div>

}