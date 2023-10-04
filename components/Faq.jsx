import useTaperedEdges from "@components/useTaperedEdges";
import Gradient from "@components/Gradient";
import { motion } from "framer-motion";

function Question(question, idx) {
    return <button onClick={question.onClick} key={idx} className="shadow-2xl grow overflow-hidden">
        <Gradient style={{ padding:"0.6px" }} theme="circle">
            <div className="text-white font-ibmCondensed" style={{ backgroundColor: "rgba(6, 30, 42,1)"}}>
                <div className="p-6 bg-gradient-to-tl hover:to-white/1 hover:from-black/10 to-black/5 from-white/1 flex gap-2 justify-center align-middle">
                {question.text} <div className="border border-white/30 h-6 w-6 p-0.5 rounded-full flex justify-center align-middle text-xs">&#63;</div>
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
        initial={{ opacity: 0, scale:0.9 }}
        animate={{ opacity: 1, scale:1 }}
        transition={{ duration: 0.5, delay: 7 }}
        className="px-36 flex gap-6">
            {questions.map(Question)}
    </motion.div>
}