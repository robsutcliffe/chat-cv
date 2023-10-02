import {useContext, useEffect, useState} from "react";
import {ColourContext} from "@context/colour.conetxt";
import { motion, useAnimation } from "framer-motion";

export default function Gradient({ primary, children, ...props }) {
    const {primeColours, secondaryColours} = useContext(ColourContext);
    const colours = primary ? primeColours : secondaryColours;
    const controls = useAnimation();




    useEffect(() => {
        (async function () {
            await controls.start({backgroundImage: `linear-gradient(45deg, ${colours[0]}, ${colours[1]})`})
        })()
    }, [colours])

    return <motion.div
        {...props}
        animate={controls}
        transition={{duration: 10 }}>
            {children}
    </motion.div>
}