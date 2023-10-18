import ChatBubble from "@components/ChatBubble";
import Question from "@components/Question";
import Faq from "@components/Faq";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Chat() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([])
    const [showFaq, setShowFaq] = useState(true);
    useEffect(()=>{
        const author = "rob"
        setTimeout(() => { setMessages(prev => [...prev, { author, text: "Hi, I'm Rob!" }]) }, 600)
        setTimeout(() => { setMessages(prev => [...prev, { author, text: "Please ask me any questions below." }]) }, 1000)
        setTimeout(() => { setMessages(prev => [...prev, { author, text: "Or choose one of these questions" }]) }, 1700)
    },[])

    const ask = (standardQuestion) => {

        const text = typeof standardQuestion === "string" ? standardQuestion : question;

        setShowFaq(false)
        setMessages(prev => [...prev, {
            author: "user",
            text
        }])
        const params = { question: text }
        axios('/api/askQuestion', { params })
            .then((response) => {
                const { answer } = response.data;
                setMessages(prev => [...prev, { author: "rob", text: answer }])
            })
        setQuestion("")
    }
    return <div className="absolute w-full h-full overflow-y-scroll top-0 left-0 flex flex-col">
        <div className="grow w-full">
            <motion.div className="pt-32 pb-4 px-6 md:py-4 lg:py-6 md:px-28 lg:px-36 flex gap-5 flex-col">
                {messages.map(({ author, text }, idx) => (<ChatBubble key={idx} author={author} text={text} />))}
            </motion.div>
        </div>
        {showFaq && <div className="w-full">
            <Faq ask={ask} />
        </div>}
        <div className="w-full">
            <Question ask={ask} setQuestion={setQuestion} question={question} />
        </div>
    </div>
}