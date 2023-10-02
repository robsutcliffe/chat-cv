import ChatBubble from "@components/ChatBubble";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import Gradient from "@components/Gradient";
export default function Chat() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        const author = "rob"
        setTimeout(() => { setMessages(prev => [...prev, { author, text: "Hi, I'm Rob!" }]) }, 3600)
        setTimeout(() => { setMessages(prev => [...prev, { author, text: "Please ask me any questions." }]) }, 5000)
    },[])



    const ask = () => {
        setMessages(prev => [...prev, {
            author: "user",
            text: question
        }])
        axios('/api/askQuestion', {params: { question } })
            .then((response) => {
                const { answer } = response.data;
                setMessages(prev => [...prev, { author: "rob", text: answer }])
            })
        setQuestion("")
    }
    return <div className="absolute w-full h-full m-1 overflow-y-scroll top-0 left-0 flex flex-col">
        <div className="grow w-full">
            <motion.div className="py-6 px-36 flex gap-4 flex-col">
                {messages.map(message => <ChatBubble author={message.author} text={message.text} />)}
            </motion.div>
        </div>
        <div className="w-full">
            <motion.div
                initial={{ opacity: 0, scale:0.9 }}
                animate={{ opacity: 1, scale:1 }}
                transition={{ duration: 0.5, delay: 5 }}
                className="relative flex py-6 px-36">
                <label htmlFor="question" className="sr-only">
                    Question
                </label>
                <div className="relative overflow-hidden flex-auto min-w-0 rounded-l-md bg-white">
                    <Gradient className="absolute pointer-events-none w-full h-full rounded-l-md opacity-50">
                        <div className="absolute bg-black/30 w-full h-full z-0"></div>
                        <div style={{filter: "blur(3px)" }}  className="m-1 bg-white w-full h-full"></div>
                    </Gradient>
                    <input
                        id="question"
                        type="text"
                        required
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="h-full border-l border-t border-white/30 font-ibmCondensed bg-transparent text-lg relative z-10 w-full border-0 px-5 py-2 text-gray-900 ring-0 placeholder:text-gray-600 sm:leading-6 focus:outline-none"
                        placeholder="Ask your question..."
                    />
                </div>
                <Gradient primary={true} className="rounded-r-md">
                    <button
                        type="submit"
                        onClick={ask}
                        className="flex-none border-l border-t border-white/20 bg-gradient-to-tl to-white/10 from-black/30 rounded-r-md px-12 py-4 text-sm text-white font-ibmCondensed"
                    >
                        ASK
                    </button>
                </Gradient>
            </motion.div>
        </div>
    </div>
}