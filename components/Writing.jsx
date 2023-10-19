import {motion} from "framer-motion";
import Gradient from "@components/Gradient";

export default function Writing() {
    return <motion.div className="flex gap-2 m-1">
        <motion.div animate={{ y: [-2,  2,  -2] }} transition={{ repeat: Infinity, duration: 1, delay: 0,
            ease: "easeInOut" }} >
            <Gradient theme="secondary" className="rounded-full p-0.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white"/>
            </Gradient>
        </motion.div>
        <motion.div animate={{ y: [-3,  3,  -3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2,
            ease: "easeInOut" }} >
            <Gradient theme="secondary" className="rounded-full p-0.5">
                <div className="w-3 h-3 rounded-full bg-white"/>
            </Gradient>
        </motion.div>
        <motion.div animate={{ y: [-2,  2,  -2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4,
            ease: "easeInOut" }} >
            <Gradient theme="secondary" className="rounded-full p-0.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white"/>
            </Gradient>
        </motion.div>
    </motion.div>
}