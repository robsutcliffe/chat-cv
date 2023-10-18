import useTaperedEdges from "@components/useTaperedEdges";
import Gradient from "@components/Gradient";
import { motion } from "framer-motion";

function Question({question}) {
    return <button onClick={question.onClick}  className="shadow-2xl grow overflow-hidden">
        <Gradient style={{ padding: 2 }} theme="circle">
            <div className="text-white font-ibmCondensed" style={{ backgroundColor: "rgba(6, 30, 42,1)" }}>
                <div className="p-2 md:p-4 lg:p-6 bg-gradient-to-tl text-sm md:text-base hover:to-white/1 hover:from-black/10 to-black/5 from-white/1 flex gap-2 justify-center align-middle">
                {question.text} <div className="border border-white/30 h-6 w-6 p-0.5 rounded-full flex justify-center align-middle text-2xs md:text-xs">&#63;</div>
                </div>
            </div>
        </Gradient>
    </button>
}

export default function Faq({ ask }) {

    const questions = [
        {
            text: "Can you do a data visulisation job",
            onClick: () => ask("Hi Rob, how well would you fit in a data visulisation job?")
        },
        {
            text: "Do you know WebGl",
            onClick: () => ask("Hi Rob, have you ever used webgl or html canvas")
        },
        {
            text: "How much experience do you have with Javascript",
            onClick: () => ask("Hi Rob, what's your experience level with Javascript?")
        }
    ]

    return <motion.div
        initial={{ opacity: 0, scale:0.95 }}
        animate={{ opacity: 1, scale:1 }}
        transition={{ duration: 0.4, delay: 7 }}
        className="px-6 md:px-28 lg:px-36 flex gap-3 lg:gap-6 flex-col lg:flex-row">
            {questions.map((question, idx) => <Question question={question} key={idx} />)}
    </motion.div>
}