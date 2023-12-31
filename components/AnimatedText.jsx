import { motion } from "framer-motion";
import linkWords from "../data/linkWords.json";
import { useEffect, useState, useRef } from "react";

export default function AnimText({ delay = 0, baseText, checkScrollPosition }) {
    const ref = useRef();
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        const timerId = setInterval(() => {
            if (displayText.length < baseText.length) {
                setDisplayText(baseText.slice(0, displayText.length + 1));
            } else {
                clearInterval(timerId);
            }
        }, 15);

        return () => clearInterval(timerId);
    }, [baseText, displayText.length]);

    const processText = (text) => {
        const insertLinks = (str) => {
            let elements = [str];
            linkWords.forEach(linkWord => {
                elements = elements.map((element, idx) =>
                    typeof element === 'string' ? (
                        element.split(linkWord.text).flatMap((segment, i, arr) =>
                            i === arr.length - 1 ? (
                                segment
                            ) : (
                                [segment, <a key={`${linkWord.text}-${idx}-${i}`} style={{ color: "#126988" }} href={linkWord.link} target="_blank">{linkWord.replacement}</a>]
                            )
                        )
                    ) : (
                        element
                    )
                ).flat();
            });
            return elements;
        };

        return text.split(/(?<=[a-zA-Z])\. /).map((sentence, index, array) => (
            <span key={index}>
                {insertLinks(sentence)}
                {index !== array.length - 1 && <>.<br /></>}
            </span>
        ));
    };

    useEffect(checkScrollPosition, [processText])

    return <motion.span ref={ref}>{processText(displayText)}</motion.span>;
}
