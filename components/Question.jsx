import Gradient from "@components/Gradient";
import {motion} from "framer-motion";
import React, { useEffect, useRef } from 'react';

export default function Question({ ask, question, setQuestion }) {

    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return <motion.form
        initial={{ opacity: 0, scale:0.9 }}
        animate={{ opacity: 1, scale:1 }}
        transition={{ duration: 0.5, delay: 1 }}
        onSubmit={ask}
        className="relative flex pb-6 pt-4 md:px-28 lg:px-36">
        <label htmlFor="question" className="sr-only">
            Question
        </label>
        <div className="relative overflow-hidden flex-auto min-w-0 rounded-l bg-white">
            <Gradient theme="secondary" className="absolute pointer-events-none w-full h-full rounded-l opacity-50">
                <div style={{filter: "blur(3px)" }}  className="m-1 bg-white w-full h-full"></div>
            </Gradient>
            <input
                ref={inputRef}
                id="question"
                type="text"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="h-full border-l border-t border-white/30 font-ibmCondensed bg-transparent text-lg relative z-10 w-full border-0 px-5 py-2 text-gray-900 ring-0 placeholder:text-gray-600 sm:leading-6 focus:outline-none"
                placeholder="Ask your question..."
            />
        </div>
        <Gradient theme="primary" className="rounded-r">
            <button
                type="submit"
                onClick={ask}
                className="flex-none border-l border-t border-white/20 bg-gradient-to-tl hover:to-white/5 hover:from-black/10 to-black/5 from-white/10 rounded-r px-12 py-4 text-sm text-white font-ibmCondensed"
            >
                ASK
            </button>
        </Gradient>
    </motion.form>
}