import useTaperedEdges from "@components/useTaperedEdges";
import Gradient from "@components/Gradient";
import { motion } from "framer-motion";

function Question({ question }) {
  return (
    <button
      onClick={question.onClick}
      className="shadow-2xl grow overflow-hidden rounded relative"
    >
      <Gradient style={{ padding: 2 }} theme="circle">
        <motion.div
          animate={{
            left: ["-5%", "200%", "200%", "200%", "-40%", "-5%"],
            top: ["-5%", "-40%", "200%", "200%", "200%", "-5%"],
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.6, 0.65, 0.7, 0.8, 1],
          }}
          className="absolute blur-xl w-12 h-12 rounded-full bg-white"
        />
        <motion.div
          animate={{
            left: ["-200%", "120%", "90%", "-200%", "-200%", "-200%"],
            top: ["-200%", "-200%", "80%", "80%", "-80%", "-200%"],
          }}
          transition={{
            duration: 3,
            delay: 1,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.1, 0.3, 0.9, 0.95, 1],
          }}
          className="absolute blur-xl w-12 opacity-75 h-12 rounded-full bg-black"
        />
        <div
          className="text-white relative z-10 font-ibmCondensed rounded"
          style={{ backgroundColor: "rgba(6, 30, 42,1)" }}
        >
          <div className="p-2 md:p-4 lg:p-6 bg-gradient-to-tl text-sm md:text-base hover:to-white/1 hover:from-black/30 to-black/5 from-white/1 flex gap-2 justify-center align-middle">
            {question.text}{" "}
            <div className="border border-white/30 h-6 w-6 p-0.5 rounded-full flex justify-center align-middle text-2xs md:text-xs">
              &#63;
            </div>
          </div>
        </div>
      </Gradient>
    </button>
  );
}

export default function Faq({ ask }) {
  const questions = [
    {
      text: "Can you do a data vis job",
      onClick: () =>
        ask("Hi Rob, how well would you fit in a data visulisation job?"),
    },
    {
      text: "Do you know WebGl",
      onClick: () => ask("Hi Rob, have you ever used webgl or html canvas?"),
    },
    {
      text: "How Can I contact You",
      onClick: () => ask("Hi Rob, where can I contact you?"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 1.7 }}
      className="px-6 md:px-28 lg:px-36 flex gap-2 lg:gap-5 flex-col lg:flex-row"
    >
      {questions.map((question, idx) => (
        <Question question={question} key={idx} />
      ))}
    </motion.div>
  );
}
