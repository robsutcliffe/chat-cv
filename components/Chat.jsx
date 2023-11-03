import ChatBubble from "@components/ChatBubble";
import Question from "@components/Question";
import Faq from "@components/Faq";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect, createRef } from "react";
export default function Chat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [showFaq, setShowFaq] = useState(true);
  const [thinking, setThinking] = useState(false);
  const containerRef = createRef();

  const [isScrolledTop, setIsScrolledTop] = useState(true);
  const [isScrolledBottom, setIsScrolledBottom] = useState(true);

  const checkScrollPosition = () => {
    const el = containerRef.current;
    if (el.scrollTop < 10) {
      setIsScrolledTop(true);
    } else {
      setIsScrolledTop(false);
    }
    if (el.scrollHeight - el.scrollTop < el.clientHeight + 10) {
      setIsScrolledBottom(true);
    } else {
      setIsScrolledBottom(false);
    }
  };

  useEffect(() => {
    const author = "rob";
    setTimeout(() => {
      setMessages((prev) => [...prev, { author, text: "Hi, I'm Rob!" }]);
    }, 600);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { author, text: "Please ask me any questions below." },
      ]);
    }, 1000);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { author, text: "Or choose one of these questions" },
      ]);
    }, 1700);
  }, []);

  useEffect(checkScrollPosition, [messages]);

  const ask = (standardQuestion) => {
    const text =
      typeof standardQuestion === "string" ? standardQuestion : question;

    setShowFaq(false);
    setThinking(true);
    setMessages((prev) => [
      ...prev,
      {
        author: "user",
        text,
      },
      {
        author: "rob",
        text: "--waiting--",
      },
    ]);
    const params = { question: text };
    axios("/api/askQuestion", { params }).then((response) => {
      const { answer } = response.data;
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        { ...prev[prev.length - 1], text: answer },
      ]);
      setThinking(false);
    });
    setQuestion("");
  };
  return (
    <div
      onScroll={checkScrollPosition}
      ref={containerRef}
      className="absolute w-full h-full overflow-y-scroll top-0 left-0 flex flex-col"
    >
      <div className="m-2 md:m-4 lg:m-6 z-20 fixed top-0 left-0 bottom-0 right-0 pointer-events-none">
        <motion.div
          animate={{ opacity: isScrolledTop ? 0 : 0.8 }}
          className="bg-gradient-to-b from-black h-8 absolute top-0 left-0 right-0"
        />
        <motion.div
          animate={{ opacity: isScrolledBottom ? 0 : 0.8 }}
          className="bg-gradient-to-t from-black h-8 absolute bottom-0 left-0 right-0"
        />
      </div>
      <div className="grow w-full">
        <motion.div className="pt-32 pb-4 px-6 md:py-4 lg:py-6 md:px-28 lg:px-36 flex gap-5 flex-col">
          {messages.map(({ author, text }, idx) => (
            <ChatBubble
              key={idx}
              author={author}
              text={text}
              checkScrollPosition={checkScrollPosition}
            />
          ))}
        </motion.div>
      </div>
      {showFaq && (
        <div className="w-full">
          <Faq ask={ask} />
        </div>
      )}
      <div className="w-full">
        <Question
          ask={ask}
          setQuestion={setQuestion}
          question={question}
          thinking={thinking}
        />
      </div>
    </div>
  );
}
