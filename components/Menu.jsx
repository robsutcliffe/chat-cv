import { motion } from 'framer-motion'
import MenuIcon from "@components/MenuIcon";
import {useState} from "react";

export default function Menu() {

    const [open, setOpen] = useState(false)
    const [hover, setHover] = useState(false)

    return <div className="m-2 md:m-4 lg:m-6 absolute top-0 right-0 z-20">
        <motion.div
            className="pointer-events-auto cursor-pointer p-3"
            animate={
                open
                    ? hover
                        ? 'openHover'
                        : 'open'
                    : hover
                        ? 'closedHover'
                        : 'closed'
            }
            onMouseOut={() => setHover(false)}
            onMouseOver={() => setHover(true)}
            onClick={() => setOpen((prev) => !prev)}>
                <MenuIcon className="h-12 w-12" stroke="#ffffff" />
        </motion.div>
    </div>
}